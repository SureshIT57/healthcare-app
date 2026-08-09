import React, { memo, useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { CommonPickerDialog } from './CommonPickerDialog';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

const fieldStyles = StyleSheet.create({
  field: {
    backgroundColor: COLORS.inputBg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldError: { borderColor: COLORS.error },
  placeholder: { color: COLORS.textMuted, ...TYPOGRAPHY.body, flex: 1 },
  value: { color: COLORS.black, ...TYPOGRAPHY.body, flex: 1 },
  error: { marginTop: SPACING.xs, color: COLORS.error, ...TYPOGRAPHY.caption },
  datePicker: { alignSelf: 'center', width: '100%' },
  datePickerWrap: {
    minHeight: Platform.OS === 'ios' ? 320 : undefined,
    justifyContent: 'center',
  },
  optionRow: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  optionRowActive: { backgroundColor: COLORS.badgeTealBg },
  optionText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary },
  optionTextActive: { color: COLORS.primary, fontWeight: '700' },
});

type FieldShellProps = {
  placeholder: string;
  displayValue: string;
  error?: string | null;
  containerStyle?: object;
  onOpen: () => void;
};

const FieldShell = memo(function FieldShell({
  placeholder,
  displayValue,
  error,
  containerStyle,
  onOpen,
}: FieldShellProps) {
  return (
    <View style={containerStyle}>
      <Pressable
        style={[fieldStyles.field, error ? fieldStyles.fieldError : null]}
        onPress={onOpen}
        accessibilityRole="button"
      >
        <Text style={displayValue ? fieldStyles.value : fieldStyles.placeholder} numberOfLines={1}>
          {displayValue || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
      </Pressable>
      {error ? <Text style={fieldStyles.error}>{error}</Text> : null}
    </View>
  );
});

type DateFieldProps = {
  placeholder?: string;
  value: string;
  onChange: (iso: string) => void;
  error?: string | null;
  containerStyle?: object;
  maximumDate?: Date;
  minimumDate?: Date;
};

export const DateOfBirthField = memo(function DateOfBirthField({
  placeholder = 'Date of Birth',
  value,
  onChange,
  error,
  containerStyle,
  maximumDate = new Date(),
  minimumDate = new Date(1920, 0, 1),
}: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(() => parseIsoDate(value) ?? new Date(1995, 0, 1));

  const display = useMemo(() => {
    const parsed = parseIsoDate(value);
    return parsed ? formatDisplayDate(parsed) : '';
  }, [value]);

  const openDialog = () => {
    setDraft(parseIsoDate(value) ?? new Date(1995, 0, 1));
    setOpen(true);
  };

  const onDateChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (selected) setDraft(selected);
  };

  return (
    <>
      <FieldShell
        placeholder={placeholder}
        displayValue={display}
        error={error}
        containerStyle={containerStyle}
        onOpen={openDialog}
      />
      <CommonPickerDialog
        visible={open}
        title={placeholder}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          onChange(toIsoDate(draft));
          setOpen(false);
        }}
        confirmLabel="Select"
      >
        <View style={fieldStyles.datePickerWrap}>
          <DateTimePicker
            value={draft}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
            onChange={onDateChange}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            themeVariant="light"
            style={fieldStyles.datePicker}
          />
        </View>
      </CommonPickerDialog>
    </>
  );
});

type OptionFieldProps = {
  placeholder: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  error?: string | null;
  containerStyle?: object;
};

export const OptionPickerField = memo(function OptionPickerField({
  placeholder,
  value,
  options,
  onChange,
  error,
  containerStyle,
}: OptionFieldProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);

  const openDialog = () => {
    setDraft(value || options[0] || '');
    setOpen(true);
  };

  return (
    <>
      <FieldShell
        placeholder={placeholder}
        displayValue={value}
        error={error}
        containerStyle={containerStyle}
        onOpen={openDialog}
      />
      <CommonPickerDialog
        visible={open}
        title={placeholder}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          if (draft) onChange(draft);
          setOpen(false);
        }}
        confirmLabel="Select"
      >
        <ScrollView style={{ maxHeight: 240 }} keyboardShouldPersistTaps="handled">
          {options.map((option) => {
            const active = draft === option;
            return (
              <Pressable
                key={option}
                style={[fieldStyles.optionRow, active && fieldStyles.optionRowActive]}
                onPress={() => setDraft(option)}
              >
                <Text style={[fieldStyles.optionText, active && fieldStyles.optionTextActive]}>{option}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </CommonPickerDialog>
    </>
  );
});
