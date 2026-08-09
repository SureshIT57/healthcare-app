import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';
import type { HomeStackParamList } from '../../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'PaymentSuccess'>;

export function PaymentSuccessScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('AppointmentPass', { appointmentId: 'a1' });
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.badge}>
        <Ionicons name="checkmark" size={56} color={COLORS.white} />
      </View>
      <Text style={styles.title}>Payment successful</Text>
      <Text style={styles.subtitle}>Your transaction was completed securely.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.paymentBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  badge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { marginTop: 28, ...TYPOGRAPHY.h2, color: COLORS.black, fontWeight: '700' },
  subtitle: { marginTop: 10, textAlign: 'center', color: COLORS.textLight, ...TYPOGRAPHY.bodySm },
});
