import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TealHeader } from '../../components/ui/TealHeader';
import { FilterChips } from '../../components/ui/FilterChips';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useMockFetch } from '../../hooks';
import { fetchAppointments, fetchClinicById, fetchDoctorById } from '../../services/mockApi';
import type { Appointment } from '../../types';
import type { AppointmentStackParamList } from '../../navigation/AppointmentStackNavigator';

type Props = NativeStackScreenProps<AppointmentStackParamList, 'AppointmentList'>;

export function AppointmentListScreen({ navigation }: Props) {
  const [filter, setFilter] = useState('All');
  const { data, loading, refreshing, refresh } = useMockFetch(fetchAppointments, []);

  const filtered = useMemo(() => {
    const list = data ?? [];
    if (filter === 'All') return list;
    if (filter === 'Completed') return list.filter((a) => a.status === 'completed');
    if (filter === 'Upcoming') return list.filter((a) => a.status === 'upcoming');
    return list.filter((a) => a.status === 'cancelled');
  }, [data, filter]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.headerArea}>
        <TealHeader
          title="Appointment"
          subtitle="Your upcoming and past appointments"
          rightAction={<Ionicons name="ellipsis-horizontal" size={22} color={COLORS.white} />}
        />
      </View>
      <View style={styles.filters}>
        <FilterChips
          options={['All', 'Completed', 'Upcoming', 'Cancelled']}
          selected={filter}
          onSelect={setFilter}
        />
      </View>

      {loading && !data ? (
        <ActivityIndicator color={COLORS.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <AppointmentCard appointment={item} onView={() => navigation.navigate('AppointmentPass', { appointmentId: item.id })} />
          )}
        />
      )}
    </View>
  );
}

function AppointmentCard({ appointment, onView }: { appointment: Appointment; onView: () => void }) {
  const { data: doctor } = useMockFetch(() => fetchDoctorById(appointment.doctorId), [appointment.doctorId]);
  const { data: clinic } = useMockFetch(() => fetchClinicById(appointment.clinicId), [appointment.clinicId]);
  const upcoming = appointment.status === 'upcoming';

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardTitleWrap}>
          <Ionicons name="calendar" size={18} color={COLORS.primary} />
          <View>
            <Text style={styles.cardTitle}>{upcoming ? 'Upcoming Appointment' : 'Past Appointment'}</Text>
            <Text style={styles.cardSub}>{upcoming ? 'Your next consultation' : 'Consultation history'}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, upcoming ? styles.upcomingBadge : styles.completedBadge]}>
          <Ionicons
            name={upcoming ? 'time-outline' : 'checkmark-circle-outline'}
            size={14}
            color={upcoming ? COLORS.primary : COLORS.successLight}
          />
          <Text style={[styles.statusText, upcoming ? styles.upcomingText : styles.completedText]}>
            {appointment.badgeLabel}
          </Text>
        </View>
      </View>

      <View style={styles.doctorRow}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.doctorName}>{doctor?.name}</Text>
          <Text style={styles.doctorMeta}>
            {doctor?.degree} - {doctor?.specialty}
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        <GridItem icon="calendar-outline" label="Date" value={appointment.dateLabel} />
        <GridItem icon="time-outline" label="Time" value={appointment.timeLabel} />
        <GridItem icon="person-outline" label="Patient" value={appointment.patientName} />
      </View>

      <View style={styles.locationRow}>
        <View style={styles.flex}>
          <Text style={styles.clinicName}>{clinic?.name}</Text>
          <Text style={styles.clinicMeta}>{clinic?.address}</Text>
          <Text style={styles.clinicMeta}>{clinic?.distanceKm}km away</Text>
        </View>
        {upcoming ? (
          <View style={styles.tokenWrap}>
            <Text style={styles.tokenLabel}>Token</Text>
            <Text style={styles.tokenNumber}>#{appointment.tokenNumber}</Text>
            <View style={styles.miniQr} />
            <Text style={styles.qrHint}>Show this QR at the clinic reception</Text>
          </View>
        ) : null}
      </View>

      <Pressable style={styles.viewBtn} onPress={onView}>
        <Text style={styles.viewBtnText}>View Appointment</Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.white} />
      </Pressable>
    </View>
  );
}

function GridItem({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.gridItem}>
      <Ionicons name={icon} size={16} color={COLORS.primary} />
      <Text style={styles.gridValue}>{value}</Text>
      <Text style={styles.gridLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerArea: { backgroundColor: COLORS.primary },
  filters: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.sm, backgroundColor: COLORS.white },
  loader: { marginTop: 40 },
  list: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, marginBottom: SPACING.lg, overflow: 'hidden', ...SHADOWS.card },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', padding: SPACING.lg, alignItems: 'flex-start' },
  cardTitleWrap: { flexDirection: 'row', gap: SPACING.sm, flex: 1 },
  cardTitle: { ...TYPOGRAPHY.bodySm, fontWeight: '700' },
  cardSub: { ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.sm },
  upcomingBadge: { backgroundColor: COLORS.badgeTealBg },
  completedBadge: { backgroundColor: COLORS.successBg },
  statusText: { ...TYPOGRAPHY.caption, fontWeight: '600' },
  upcomingText: { color: COLORS.primary },
  completedText: { color: COLORS.successLight },
  doctorRow: { flexDirection: 'row', gap: SPACING.md, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.inputBg },
  doctorName: { ...TYPOGRAPHY.bodySm, fontWeight: '700' },
  doctorMeta: { ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  grid: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: COLORS.border, paddingVertical: SPACING.md },
  gridItem: { flex: 1, alignItems: 'center', borderRightWidth: 1, borderColor: COLORS.border },
  gridValue: { ...TYPOGRAPHY.caption, fontWeight: '700', marginTop: 4, textAlign: 'center' },
  gridLabel: { ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  locationRow: { flexDirection: 'row', padding: SPACING.lg, gap: SPACING.md },
  flex: { flex: 1 },
  clinicName: { ...TYPOGRAPHY.bodySm, color: COLORS.primary, fontWeight: '700' },
  clinicMeta: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginTop: 2 },
  tokenWrap: { alignItems: 'center', width: 96 },
  tokenLabel: { ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  tokenNumber: { color: COLORS.verified, fontWeight: '700', fontSize: 18 },
  miniQr: { width: 56, height: 56, backgroundColor: COLORS.black, marginTop: 4, borderRadius: 4 },
  qrHint: { ...TYPOGRAPHY.caption, color: COLORS.verified, textAlign: 'center', marginTop: 4, fontSize: 10 },
  viewBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  viewBtnText: { color: COLORS.white, fontWeight: '700' },
});
