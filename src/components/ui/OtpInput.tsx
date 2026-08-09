import React, { memo, useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
};

export const OtpInput = memo(function OtpInput({ value, onChange, error }: Props) {
  const inputRef = useRef<TextInput>(null);
  const digits = value.padEnd(6, ' ').slice(0, 6).split('');

  const handleChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 6);
    onChange(cleaned);
  };

  return (
    <View>
      <Pressable style={styles.row} onPress={() => inputRef.current?.focus()}>
        {digits.map((digit, index) => (
          <View key={index} style={[styles.box, error ? styles.boxError : null]}>
            <Text style={styles.digit}>{digit.trim()}</Text>
          </View>
        ))}
      </Pressable>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={6}
        style={styles.hiddenInput}
        autoFocus
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  box: {
    flex: 1,
    maxWidth: 48,
    aspectRatio: 1,
    backgroundColor: COLORS.otpBox,
    borderRadius: RADIUS.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxError: { borderWidth: 1, borderColor: COLORS.error },
  digit: { ...TYPOGRAPHY.h2, color: COLORS.black },
  hiddenInput: { position: 'absolute', opacity: 0, height: 1, width: 1 },
  error: { marginTop: SPACING.sm, color: COLORS.error, ...TYPOGRAPHY.caption },
});
