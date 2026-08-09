import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dr20Logo } from '../../components/Dr20Logo';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { sendOtp } from '../../services/mockApi';
import { validatePhone } from '../../utils/validation';
import type { AuthStackParamList } from '../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [countryCode] = useState('(+91)');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSendOtp = async () => {
    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setLoading(true);
    await sendOtp(phone);
    setLoading(false);
    navigation.navigate('Otp', { phone, countryCode: '+91' });
  };

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.welcome}>Welcome to</Text>
        <View style={styles.logoBlock}>
          <Dr20Logo size={120} />
        </View>

        <Text style={styles.sectionTitle}>Enter phone number</Text>
        <View style={[styles.phoneRow, error ? styles.phoneError : null]}>
          <Pressable style={styles.codeBox}>
            <Text style={styles.codeText}>{countryCode}</Text>
            <Ionicons name="chevron-down" size={16} color={COLORS.textMuted} />
          </Pressable>
          <View style={styles.divider} />
          <TextInput
            style={styles.inputBox}
            placeholder="Enter your mobile number"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.infoRow}>
          <Ionicons name="information-circle-outline" size={16} color={COLORS.textMuted} />
          <Text style={styles.infoText}>Mobile Number cannot be changed later</Text>
        </View>

        <PrimaryButton title="Send OTP" loading={loading} onPress={onSendOtp} style={styles.cta} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: SPACING.xxl, paddingBottom: SPACING.xxxl },
  welcome: { marginTop: SPACING.huge, ...TYPOGRAPHY.hero, fontWeight: '400', color: COLORS.black },
  logoBlock: { alignItems: 'center', marginTop: SPACING.xxxl, marginBottom: SPACING.huge },
  sectionTitle: { ...TYPOGRAPHY.h2, color: COLORS.black, marginBottom: SPACING.lg },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBgAlt,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    minHeight: 56,
  },
  phoneError: { borderWidth: 1, borderColor: COLORS.error },
  codeBox: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingRight: SPACING.md },
  codeText: { ...TYPOGRAPHY.body, color: COLORS.black },
  divider: { width: 1, height: 28, backgroundColor: COLORS.border },
  inputBox: { flex: 1, paddingLeft: SPACING.md, ...TYPOGRAPHY.body, color: COLORS.black },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: SPACING.md },
  infoText: { ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  cta: { marginTop: SPACING.xxxl },
  error: { marginTop: SPACING.sm, color: COLORS.error, ...TYPOGRAPHY.caption },
});
