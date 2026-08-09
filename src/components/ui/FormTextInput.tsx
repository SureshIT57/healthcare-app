import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

type Props = TextInputProps & {
  label?: string;
  error?: string | null;
  containerStyle?: object;
};

export const FormTextInput = memo(function FormTextInput({
  label,
  error,
  containerStyle,
  style,
  ...rest
}: Props) {
  return (
    <View style={containerStyle}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={COLORS.textMuted}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

type SelectProps = {
  label?: string;
  value?: string;
  placeholder: string;
  onPress?: () => void;
  error?: string | null;
};

export const FormSelect = memo(function FormSelect({ label, value, placeholder, onPress, error }: SelectProps) {
  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable style={[styles.input, styles.select, error ? styles.inputError : null]} onPress={onPress}>
        <Text style={value ? styles.value : styles.placeholder}>{value || placeholder}</Text>
        <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  label: { ...TYPOGRAPHY.bodySm, color: COLORS.textMuted, marginBottom: SPACING.xs },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    ...TYPOGRAPHY.body,
    color: COLORS.black,
  },
  inputError: { borderColor: COLORS.error },
  select: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  placeholder: { color: COLORS.textMuted, ...TYPOGRAPHY.body },
  value: { color: COLORS.black, ...TYPOGRAPHY.body },
  error: { marginTop: SPACING.xs, color: COLORS.error, ...TYPOGRAPHY.caption },
});
