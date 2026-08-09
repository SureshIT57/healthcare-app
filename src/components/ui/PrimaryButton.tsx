import React, { memo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { COLORS, RADIUS, TYPOGRAPHY } from '../../constants/theme';

type Variant = 'primary' | 'outline' | 'ghost' | 'light';

type Props = PressableProps & {
  title: string;
  loading?: boolean;
  variant?: Variant;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export const PrimaryButton = memo(function PrimaryButton({
  title,
  loading = false,
  disabled,
  variant = 'primary',
  fullWidth = true,
  style,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        fullWidth && styles.fullWidth,
        variantStyles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? COLORS.white : COLORS.primary} />
      ) : (
        <Text style={[styles.label, labelStyles[variant], isDisabled && styles.labelDisabled]}>{title}</Text>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  fullWidth: { alignSelf: 'stretch' },
  pressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.55 },
  label: { ...TYPOGRAPHY.button },
  labelDisabled: { opacity: 0.8 },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: COLORS.primary },
  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  ghost: { backgroundColor: '#F2F2F2', borderWidth: 1.5, borderColor: COLORS.primary },
  light: { backgroundColor: COLORS.skipBg },
});

const labelStyles = StyleSheet.create({
  primary: { color: COLORS.white },
  outline: { color: COLORS.primary },
  ghost: { color: COLORS.primary },
  light: { color: COLORS.primary },
});
