import React, { memo, useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

const PICKER_HEIGHT = Platform.OS === 'ios' ? 216 : 200;

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
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const local = new Date(year, month, day);
  if (
    local.getFullYear() !== year ||
    local.getMonth() !== month ||
    local.getDate() !== day
  ) {
    return null;
  }
  return local;
}

type Props = {
  placeholder?: string;
  value: string;
  onChange: (isoDate: string) => void;
  error?: string | null;
  containerStyle?: object;
  maximumDate?: Date;
  minimumDate?: Date;
};

export const IosDatePickerField = memo(function IosDatePickerField({
  placeholder = 'Date of Birth',
  value,
  onChange,
  error,
  containerStyle,
  maximumDate = new Date(),
  minimumDate = new Date(1920, 0, 1),
}: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(() => parseIsoDate(value) ?? new Date(1995, 0, 1));

  const display = useMemo(() => {
    const parsed = parseIsoDate(value);
    return parsed ? formatDisplayDate(parsed) : '';
  }, [value]);

  const openPicker = () => {
    setDraft(parseIsoDate(value) ?? new Date(1995, 0, 1));
    setOpen(true);
  };

  const onPickerChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (selected) {
      setDraft(selected);
    }
  };

  const confirm = () => {
    onChange(toIsoDate(draft));
    setOpen(false);
  };

  return (
    <View style={containerStyle}>
      <Pressable
        style={[styles.field, error ? styles.fieldError : null]}
        onPress={openPicker}
        accessibilityRole="button"
        accessibilityLabel={placeholder}
      >
        <Text style={display ? styles.value : styles.placeholder} numberOfLines={1}>
          {display || placeholder}
        </Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={styles.root}>
          <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
          <View style={styles.sheet}>
            <View style={styles.toolbar}>
              <Pressable onPress={() => setOpen(false)} hitSlop={8}>
                <Text style={styles.cancel}>Cancel</Text>
              </Pressable>
              <Text style={styles.title}>{placeholder}</Text>
              <Pressable onPress={confirm} hitSlop={8}>
                <Text style={styles.done}>Done</Text>
              </Pressable>
            </View>
            <View style={styles.pickerWrap}>
              <DateTimePicker
                value={draft}
                mode="date"
                display="spinner"
                onChange={onPickerChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                themeVariant="light"
                style={styles.picker}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    paddingBottom: Platform.OS === 'ios' ? SPACING.xxl : SPACING.lg,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  title: { ...TYPOGRAPHY.bodySm, fontWeight: '600', color: COLORS.textSecondary },
  cancel: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
  done: { ...TYPOGRAPHY.body, color: COLORS.primary, fontWeight: '700' },
  pickerWrap: {
    height: PICKER_HEIGHT,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: { width: '100%', height: PICKER_HEIGHT },
  field: {
    backgroundColor: COLORS.inputBg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    minHeight: 52,
    justifyContent: 'center',
  },
  fieldError: { borderColor: COLORS.error },
  placeholder: { color: COLORS.textMuted, ...TYPOGRAPHY.body },
  value: { color: COLORS.black, ...TYPOGRAPHY.body },
  error: { marginTop: SPACING.xs, color: COLORS.error, ...TYPOGRAPHY.caption },
});
