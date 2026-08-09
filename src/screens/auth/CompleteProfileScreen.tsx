import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dr20Logo } from '../../components/Dr20Logo';
import { DateOfBirthField, OptionPickerField } from '../../components/ui/ProfileFormPickers';
import { FormTextInput } from '../../components/ui/FormTextInput';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { resetToMainDashboard } from '../../navigation/navigationRef';
import { createProfile } from '../../services/mockApi';
import { setRegistrationComplete } from '../../services/authStorage';
import { validateEmail } from '../../utils/validation';
import type { AuthStackParamList, Gender } from '../../types';

const GENDER_OPTIONS = ['Male', 'Female'] as const;
const BLOOD_GROUP_OPTIONS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

type Props = NativeStackScreenProps<AuthStackParamList, 'CompleteProfile'>;

export function CompleteProfileScreen({ navigation }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    const nextErrors: Record<string, string> = {};
    if (!firstName.trim()) nextErrors.firstName = 'Required';
    if (!lastName.trim()) nextErrors.lastName = 'Required';
    const emailError = validateEmail(email);
    if (emailError) nextErrors.email = emailError;
    if (!dob.trim()) nextErrors.dob = 'Required';
    if (!gender) nextErrors.gender = 'Required';
    if (!bloodGroup) nextErrors.bloodGroup = 'Required';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    await createProfile({
      firstName,
      lastName,
      email,
      dateOfBirth: dob,
      gender: gender as Gender,
      bloodGroup,
    });
    setLoading(false);
    setSuccess(true);
    await setRegistrationComplete();
    resetToMainDashboard();
  };

  return (
    <ScreenContainer>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.white} />
        </Pressable>

        <View style={styles.logoWrap}>
          <Dr20Logo size={120} />
        </View>

        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>Basic details help us provide better healthcare support</Text>

        <View style={styles.row}>
          <FormTextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            error={errors.firstName}
            containerStyle={styles.half}
          />
          <FormTextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            error={errors.lastName}
            containerStyle={styles.half}
          />
        </View>

        <FormTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          containerStyle={styles.field}
        />

        <DateOfBirthField
          placeholder="Date of Birth"
          value={dob}
          onChange={(iso) => {
            setDob(iso);
            if (errors.dob) setErrors((prev) => ({ ...prev, dob: '' }));
          }}
          error={errors.dob}
          containerStyle={styles.field}
        />

        <OptionPickerField
          placeholder="Gender"
          value={gender}
          options={GENDER_OPTIONS}
          onChange={(next) => {
            setGender(next);
            if (errors.gender) setErrors((prev) => ({ ...prev, gender: '' }));
          }}
          error={errors.gender}
          containerStyle={styles.field}
        />

        <OptionPickerField
          placeholder="Blood Group"
          value={bloodGroup}
          options={BLOOD_GROUP_OPTIONS}
          onChange={(next) => {
            setBloodGroup(next);
            if (errors.bloodGroup) setErrors((prev) => ({ ...prev, bloodGroup: '' }));
          }}
          error={errors.bloodGroup}
          containerStyle={styles.field}
        />

        <PrimaryButton
          title={success ? 'Profile Created' : 'Create Profile'}
          loading={loading}
          disabled={success}
          onPress={onSubmit}
          style={styles.cta}
        />

        <Text style={styles.legal}>
          I agree to Listr&apos;s <Text style={styles.link}>Terms</Text> &{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: SPACING.xxl, paddingBottom: SPACING.xxxl },
  back: {
    marginTop: SPACING.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: { alignItems: 'center', marginTop: SPACING.lg, marginBottom: SPACING.xxl },
  title: { ...TYPOGRAPHY.h2, color: COLORS.black, fontWeight: '700' },
  subtitle: { marginTop: SPACING.sm, marginBottom: SPACING.xxl, color: COLORS.textMuted, ...TYPOGRAPHY.bodySm },
  row: { flexDirection: 'row', gap: SPACING.md },
  half: { flex: 1, marginBottom: SPACING.lg },
  field: { marginBottom: SPACING.lg },
  cta: { marginTop: SPACING.xxl },
  legal: { marginTop: SPACING.lg, textAlign: 'center', color: COLORS.textMuted, ...TYPOGRAPHY.caption },
  link: { textDecorationLine: 'underline', color: COLORS.textMuted },
});
