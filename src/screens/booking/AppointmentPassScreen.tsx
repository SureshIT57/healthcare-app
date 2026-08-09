import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TealHeader } from '../../components/ui/TealHeader';
import { Dr20Logo } from '../../components/Dr20Logo';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useMockFetch } from '../../hooks';
import { fetchAppointmentById, fetchClinicById, fetchDoctorById } from '../../services/mockApi';
import type { HomeStackParamList } from '../../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'AppointmentPass'>;

export function AppointmentPassScreen({ route }: Props) {
  const appointmentId = route.params?.appointmentId ?? 'a1';
  const { data: appointment } = useMockFetch(() => fetchAppointmentById(appointmentId), [appointmentId]);
  const { data: doctor } = useMockFetch(() => fetchDoctorById(appointment?.doctorId ?? 'd1'), [appointment?.doctorId]);
  const { data: clinic } = useMockFetch(() => fetchClinicById(appointment?.clinicId ?? 'c1'), [appointment?.clinicId]);

  if (!appointment) return null;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TealHeader title="Appointment Pass" subtitle="Show this QR code at reception" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Dr20Logo size={88} />
              <Text style={styles.tagline}>Healthcare Services</Text>
            </View>
            <View style={styles.tokenBadge}>
              <Text style={styles.tokenLabel}>Token</Text>
              <Text style={styles.tokenValue}>#{appointment.tokenNumber}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.doctorRow}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.doctorName}>{doctor?.name}</Text>
              <Text style={styles.degree}>{doctor?.degree}</Text>
              <Text style={styles.specialty}>{doctor?.specialty}</Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <DetailColumn icon="calendar-outline" label="Date" value={appointment.dateLabel} />
            <DetailColumn icon="time-outline" label="Time" value={appointment.timeLabel} />
            <DetailColumn icon="person-outline" label="Patient" value={appointment.patientName} />
          </View>

          <View style={styles.ticketCut}>
            <View style={styles.cutCircleLeft} />
            <View style={styles.dashed} />
            <View style={styles.cutCircleRight} />
          </View>

          <View style={styles.qrBox} />
          <Text style={styles.tokenIdLabel}>Token ID</Text>
          <Text style={styles.tokenId}>{appointment.tokenId}</Text>

          <View style={styles.locationFooter}>
            <View style={styles.map} />
            <View style={styles.flex}>
              <Text style={styles.clinicName}>{clinic?.name}</Text>
              <Text style={styles.address}>{clinic?.address}</Text>
              <Text style={styles.distance}>📍 {clinic?.distanceKm}km away</Text>
              <Text style={styles.link}>View on Map ›</Text>
            </View>
          </View>
        </View>

        <View style={styles.activeRow}>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.successLight} />
          <Text style={styles.activeText}>Active Pass</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function DetailColumn({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detailCol}>
      <Ionicons name={icon} size={18} color={COLORS.primary} />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.lg, ...SHADOWS.card },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  tagline: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginTop: 4 },
  tokenBadge: { backgroundColor: COLORS.primary, borderRadius: RADIUS.md, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, alignItems: 'center' },
  tokenLabel: { color: COLORS.white, ...TYPOGRAPHY.caption },
  tokenValue: { color: COLORS.white, fontSize: 28, fontWeight: '700' },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.lg },
  doctorRow: { flexDirection: 'row', gap: SPACING.md, alignItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.inputBg },
  doctorName: { ...TYPOGRAPHY.body, fontWeight: '700' },
  degree: { ...TYPOGRAPHY.caption },
  specialty: { color: COLORS.link, ...TYPOGRAPHY.caption },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: SPACING.lg },
  detailCol: { flex: 1, alignItems: 'center' },
  detailLabel: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginTop: 4 },
  detailValue: { ...TYPOGRAPHY.caption, fontWeight: '700', color: COLORS.primary, textAlign: 'center', marginTop: 2 },
  ticketCut: { position: 'relative', marginVertical: SPACING.lg, justifyContent: 'center' },
  dashed: { borderStyle: 'dashed', borderTopWidth: 1, borderColor: COLORS.border },
  cutCircleLeft: {
    position: 'absolute',
    left: -28,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.background,
  },
  cutCircleRight: {
    position: 'absolute',
    right: -28,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.background,
  },
  qrBox: {
    alignSelf: 'center',
    width: 180,
    height: 180,
    backgroundColor: COLORS.black,
    opacity: 0.9,
    borderRadius: RADIUS.sm,
  },
  tokenIdLabel: { textAlign: 'center', marginTop: SPACING.md, ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  tokenId: { ...TYPOGRAPHY.bodySm, textAlign: 'center', color: COLORS.primary, fontWeight: '700' },
  locationFooter: { marginTop: SPACING.lg, backgroundColor: COLORS.inputBg, borderRadius: RADIUS.lg, padding: SPACING.md, flexDirection: 'row', gap: SPACING.md },
  map: { width: 72, height: 72, borderRadius: RADIUS.md, backgroundColor: COLORS.white },
  flex: { flex: 1 },
  clinicName: { color: COLORS.primary, fontWeight: '700' },
  address: { ...TYPOGRAPHY.caption, marginTop: 2 },
  distance: { ...TYPOGRAPHY.caption, marginTop: 4 },
  link: { color: COLORS.link, ...TYPOGRAPHY.caption, marginTop: 4 },
  activeRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.lg },
  activeText: { color: COLORS.successLight, fontWeight: '700' },
});
