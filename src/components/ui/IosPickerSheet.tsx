import React, { memo, useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

const PLACEHOLDER_VALUE = '';
const PICKER_HEIGHT = Platform.OS === 'ios' ? 216 : 200;

type SheetProps = {
  visible: boolean;
  title: string;
  options: string[];
  selectedValue: string;
  placeholderLabel: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
};

export const IosWheelPickerSheet = memo(function IosWheelPickerSheet({
  visible,
  title,
  options,
  selectedValue,
  placeholderLabel,
  onClose,
  onConfirm,
}: SheetProps) {
  const [draft, setDraft] = useState(selectedValue || PLACEHOLDER_VALUE);

  React.useEffect(() => {
    if (visible) {
      setDraft(selectedValue || PLACEHOLDER_VALUE);
    }
  }, [visible, selectedValue]);

  const confirm = () => {
    if (!draft) {
      onClose();
      return;
    }
    onConfirm(draft);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close picker" />
        <View style={styles.sheet}>
          <View style={styles.toolbar}>
            <Pressable onPress={onClose} hitSlop={8}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={confirm} hitSlop={8}>
              <Text style={styles.done}>Done</Text>
            </Pressable>
          </View>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={draft}
              onValueChange={(itemValue) => setDraft(String(itemValue))}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label={placeholderLabel} value={PLACEHOLDER_VALUE} color={COLORS.textMuted} />
              {options.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </Modal>
  );
});

type SelectFieldProps = {
  placeholder: string;
  value?: string;
  options: readonly string[];
  onChange: (value: string) => void;
  error?: string | null;
  containerStyle?: object;
};

export const IosSelectField = memo(function IosSelectField({
  placeholder,
  value,
  options,
  onChange,
  error,
  containerStyle,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const optionList = useMemo(() => [...options], [options]);

  return (
    <View style={containerStyle}>
      <Pressable
        style={[styles.field, error ? styles.fieldError : null]}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
      >
        <Text style={value ? styles.value : styles.placeholder} numberOfLines={1}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <IosWheelPickerSheet
        visible={open}
        title={placeholder}
        options={optionList}
        placeholderLabel={`Select ${placeholder}`}
        selectedValue={value ?? PLACEHOLDER_VALUE}
        onClose={() => setOpen(false)}
        onConfirm={(next) => {
          onChange(next);
          setOpen(false);
        }}
      />
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
  },
  picker: { width: '100%', height: PICKER_HEIGHT },
  pickerItem: { fontSize: 20, height: PICKER_HEIGHT },
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
});
