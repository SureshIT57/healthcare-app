import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OtpInput } from '../../components/ui/OtpInput';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useCountdown } from '../../hooks';
import { sendOtp, verifyOtp } from '../../services/mockApi';
import { formatCountdown, formatPhoneDisplay, validateOtp } from '../../utils/validation';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

export function OtpScreen({ navigation, route }: Props) {
  const { phone, countryCode } = route.params;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { seconds, canResend, reset } = useCountdown(29);

  const onVerify = async () => {
    const validationError = validateOtp(otp);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setLoading(true);
    const result = await verifyOtp(otp);
    setLoading(false);
    if (!result.success) {
      setError('Invalid OTP. Try 6 digits.');
      return;
    }
    navigation.replace('CompleteProfile');
  };

  const onResend = async () => {
    if (!canResend) return;
    await sendOtp(phone);
    reset();
  };

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>Sent to {formatPhoneDisplay(countryCode, phone)}</Text>

        <View style={styles.otpWrap}>
          <OtpInput value={otp} onChange={setOtp} error={error} />
        </View>

        <Pressable onPress={onResend} disabled={!canResend}>
          <Text style={styles.timer}>
            {canResend ? 'Resend Code' : `Resend Code in ${formatCountdown(seconds)}`}
          </Text>
        </Pressable>

        <PrimaryButton title="Verify & Continue" loading={loading} onPress={onVerify} style={styles.cta} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingHorizontal: SPACING.xxl, paddingTop: 56 },
  title: { ...TYPOGRAPHY.h1, color: COLORS.black },
  subtitle: { marginTop: SPACING.sm, ...TYPOGRAPHY.bodySm, color: COLORS.textMuted },
  otpWrap: { marginTop: SPACING.huge },
  timer: { marginTop: SPACING.xxl, textAlign: 'center', ...TYPOGRAPHY.bodySm, color: COLORS.black },
  cta: { marginTop: 'auto', marginBottom: SPACING.xxxl },
});
