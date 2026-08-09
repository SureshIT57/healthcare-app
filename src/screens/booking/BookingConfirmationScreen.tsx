import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TealHeader } from '../../components/ui/TealHeader';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useMockFetch } from '../../hooks';
import { confirmPayment, fetchClinicById, fetchDoctorById, fetchTimeSlots, fetchDateOptions } from '../../services/mockApi';
import type { HomeStackParamList } from '../../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'BookingConfirmation'>;

export function BookingConfirmationScreen({ navigation, route }: Props) {
  const { doctorId, slotId, dateId } = route.params;
  const { data: doctor, loading } = useMockFetch(() => fetchDoctorById(doctorId), [doctorId]);
  const { data: clinic } = useMockFetch(() => fetchClinicById(doctor?.clinicId ?? 'c1'), [doctor?.clinicId]);
  const { data: slots } = useMockFetch(fetchTimeSlots, []);
  const { data: dates } = useMockFetch(fetchDateOptions, []);
  const [paying, setPaying] = useState(false);

  const slotLabel = slots?.find((s) => s.id === slotId)?.label ?? '9.30 AM';
  const dateLabel = dates?.find((d) => d.id === dateId)?.label ?? 'Tue 03 Jun';

  const onPay = async () => {
    setPaying(true);
    await confirmPayment();
    setPaying(false);
    navigation.replace('PaymentSuccess');
  };

  if (loading || !doctor) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TealHeader title="Booking Confirmation" subtitle="Review your appointment details" />
      <ScrollView style={styles.sheet} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.doctorRow}>
            <View style={styles.photo} />
            <View style={styles.flex}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{doctor.name}</Text>
                <Ionicons name="checkmark-circle" size={16} color={COLORS.verified} />
              </View>
              <Text style={styles.specialty}>
                {doctor.degree} - {doctor.specialty}
              </Text>
              <Text style={styles.meta}>★ {doctor.rating} ({doctor.reviewCount.toLocaleString()} Reviews)</Text>
              <Text style={styles.meta}>{doctor.experienceYears}+ yrs exp · {doctor.distanceKm}km away</Text>
              <Text style={styles.available}>● Available Today</Text>
            </View>
          </View>
        </View>

        <Text style={styles.section}>Appointment For</Text>
        <RowCard
          icon="person"
          title="pravin av"
          subtitle="Male. 26 Years. O+ Blood Group"
          action="Change"
        />

        <RowCard icon="calendar" title="Selected Slot" subtitle={`${dateLabel} - ${slotLabel}`} action="Change" />

        <Text style={styles.section}>Clinic Information</Text>
        <View style={styles.clinicCard}>
          <View style={styles.map} />
          <View style={styles.flex}>
            <Text style={styles.clinicName}>{clinic?.name}</Text>
            <Text style={styles.meta}>{clinic?.address}</Text>
            <Text style={styles.meta}>🕒 {clinic?.hours}</Text>
            <Text style={styles.meta}>📍 {clinic?.distanceKm}km away</Text>
            <Text style={styles.link}>View on Map ›</Text>
          </View>
        </View>

        <Text style={styles.section}>Bill Summary</Text>
        <View style={styles.billCard}>
          <BillRow label="Items Total" value="₹20" />
          <BillRow label="Platform Fee" value="₹8" strike secondary="₹Free" />
          <View style={styles.dashed} />
          <BillRow label="To pay" value="₹20" bold />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="Confirm & Pay" loading={paying} onPress={onPay} />
      </View>
    </View>
  );
}

function RowCard({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  action: string;
}) {
  return (
    <View style={styles.rowCard}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={18} color={COLORS.white} />
      </View>
      <View style={styles.flex}>
        {title === 'Selected Slot' ? (
          <>
            <Text style={styles.rowLabel}>{title}</Text>
            <Text style={styles.rowTitle}>{subtitle}</Text>
          </>
        ) : (
          <>
            <Text style={styles.rowTitle}>{title}</Text>
            <Text style={styles.rowLabel}>{subtitle}</Text>
          </>
        )}
      </View>
      <Text style={styles.link}>
        {action} <Ionicons name="chevron-forward" size={12} color={COLORS.verified} />
      </Text>
    </View>
  );
}

function BillRow({
  label,
  value,
  strike,
  secondary,
  bold,
}: {
  label: string;
  value: string;
  strike?: boolean;
  secondary?: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.billRow}>
      <Text style={[styles.billLabel, bold && styles.bold]}>{label}</Text>
      <View style={styles.billValues}>
        {strike ? <Text style={styles.strike}>{value}</Text> : null}
        {secondary ? <Text style={styles.free}>{secondary}</Text> : null}
        {!secondary ? <Text style={[styles.billValue, bold && styles.bold]}>{value}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sheet: { flex: 1, backgroundColor: COLORS.background, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  content: { padding: SPACING.lg, paddingBottom: 120 },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.lg, ...SHADOWS.soft },
  doctorRow: { flexDirection: 'row', gap: SPACING.md },
  photo: { width: 72, height: 72, borderRadius: RADIUS.md, backgroundColor: COLORS.inputBg },
  flex: { flex: 1 },
  nameRow: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  name: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.primary },
  specialty: { color: COLORS.link, ...TYPOGRAPHY.caption },
  meta: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginTop: 2 },
  available: { ...TYPOGRAPHY.caption, color: COLORS.successLight, marginTop: 4 },
  section: { ...TYPOGRAPHY.body, marginTop: SPACING.lg, color: COLORS.primary, fontWeight: '700' },
  rowCard: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    ...SHADOWS.soft,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { fontWeight: '700', color: COLORS.primary },
  rowLabel: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginTop: 2 },
  link: { color: COLORS.verified, ...TYPOGRAPHY.caption, fontWeight: '600' },
  clinicCard: { flexDirection: 'row', gap: SPACING.md, backgroundColor: COLORS.white, padding: SPACING.lg, borderRadius: RADIUS.lg, ...SHADOWS.soft },
  map: { width: 96, height: 96, borderRadius: RADIUS.md, backgroundColor: COLORS.inputBg },
  clinicName: { color: COLORS.primary, fontWeight: '700' },
  billCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.lg, ...SHADOWS.soft },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.sm },
  billLabel: { ...TYPOGRAPHY.bodySm, color: COLORS.textSecondary },
  billValue: { ...TYPOGRAPHY.bodySm, color: COLORS.textSecondary },
  billValues: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'center' },
  strike: { textDecorationLine: 'line-through', color: COLORS.textMuted, ...TYPOGRAPHY.bodySm },
  free: { ...TYPOGRAPHY.bodySm, color: COLORS.successLight, fontWeight: '700' },
  bold: { fontWeight: '700', color: COLORS.black },
  dashed: { borderStyle: 'dashed', borderTopWidth: 1, borderColor: COLORS.border, marginVertical: SPACING.sm },
  footer: { padding: SPACING.lg, backgroundColor: COLORS.background },
});
