import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TealHeader } from '../../components/ui/TealHeader';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useMockFetch } from '../../hooks';
import {
  fetchClinicById,
  fetchDateOptions,
  fetchDoctorById,
  fetchReviews,
  fetchTimeSlots,
  getDefaultLocation,
} from '../../services/mockApi';
import type { HomeStackParamList } from '../../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'DoctorProfile'>;

export function DoctorProfileScreen({ navigation, route }: Props) {
  const { doctorId } = route.params;
  const { data: doctor, loading } = useMockFetch(() => fetchDoctorById(doctorId), [doctorId]);
  const { data: clinic } = useMockFetch(() => fetchClinicById(doctor?.clinicId ?? 'c1'), [doctor?.clinicId]);
  const { data: dates } = useMockFetch(fetchDateOptions, []);
  const { data: slots } = useMockFetch(fetchTimeSlots, []);
  const { data: reviews } = useMockFetch(fetchReviews, []);
  const [selectedDate, setSelectedDate] = useState('d-tue');
  const [selectedSlot, setSelectedSlot] = useState('s1');

  const activeDateLabel = useMemo(
    () => dates?.find((d) => d.id === selectedDate)?.label ?? 'Tue 03 Jun',
    [dates, selectedDate],
  );
  const activeSlotLabel = useMemo(
    () => slots?.find((s) => s.id === selectedSlot)?.label ?? '06:00 PM',
    [slots, selectedSlot],
  );

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
      <TealHeader
        title="Doctor Profile"
        subtitle={`📍 ${getDefaultLocation()}`}
        rightAction={
          <View style={styles.headerActions}>
            <Ionicons name="bookmark-outline" size={20} color={COLORS.white} />
            <Ionicons name="share-social-outline" size={20} color={COLORS.white} />
          </View>
        }
      />

      <ScrollView style={styles.sheet} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.doctorRow}>
            <View style={styles.photo} />
            <View style={styles.flex}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{doctor.name}</Text>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.verified} />
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

        <View style={styles.feeCard}>
          <View style={styles.feeBadge}>
            <Text style={styles.feeAmount}>₹{doctor.consultationFee}</Text>
          </View>
          <View>
            <Text style={styles.feeTitle}>Dr.20 Consultation</Text>
            <Text style={styles.feeSub}>Fixed Consultation Fee</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About Doctor</Text>
        <Text style={styles.paragraph}>{doctor.about}</Text>

        <Text style={styles.sectionTitle}>Expertise</Text>
        <View style={styles.chips}>
          {(doctor.expertise ?? []).map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRow}>
          {(dates ?? []).map((date) => {
            const active = date.id === selectedDate;
            return (
              <Pressable
                key={date.id}
                style={[styles.dateChip, active && styles.dateChipActive]}
                onPress={() => setSelectedDate(date.id)}
              >
                <Text style={[styles.dateText, active && styles.dateTextActive]}>{date.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Available Slots</Text>
        <View style={styles.slotGrid}>
          {(slots ?? []).map((slot) => {
            const active = slot.id === selectedSlot;
            return (
              <Pressable
                key={slot.id}
                disabled={!slot.available}
                style={[
                  styles.slot,
                  active && styles.slotActive,
                  !slot.available && styles.slotDisabled,
                ]}
                onPress={() => setSelectedSlot(slot.id)}
              >
                <Text
                  style={[
                    styles.slotText,
                    active && styles.slotTextActive,
                    !slot.available && styles.slotTextDisabled,
                  ]}
                >
                  {slot.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Clinic Information</Text>
        <View style={styles.clinicCard}>
          <View style={styles.mapThumb} />
          <View style={styles.flex}>
            <Text style={styles.clinicName}>{clinic?.name}</Text>
            <Text style={styles.clinicMeta}>{clinic?.address}</Text>
            <Text style={styles.clinicMeta}>🕒 {clinic?.hours}</Text>
            <Text style={styles.clinicMeta}>📍 {clinic?.distanceKm}km away</Text>
            <Text style={styles.link}>View on Map ›</Text>
          </View>
        </View>

        <View style={styles.reviewHeader}>
          <Text style={styles.sectionTitle}>Patient Reviews</Text>
          <Text style={styles.link}>See all reviews</Text>
        </View>
        <View style={styles.reviewRow}>
          <View>
            <Text style={styles.ratingBig}>4.8</Text>
            <Text>★★★★★</Text>
          </View>
          <View style={styles.flex}>
            {(reviews ?? []).slice(0, 2).map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewAvatar}>
                  <Text>{review.initial}</Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.reviewText}>{review.text}</Text>
                  <Text style={styles.reviewAuthor}>- {review.author}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.reasonCard}>
          <Text style={styles.sectionTitle}>Reason For Visit</Text>
          <Text style={styles.paragraph}>
            Patient reports mild fever and sore throat for two days. No chronic conditions reported.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Continue ›"
          fullWidth={false}
          style={styles.continueBtn}
          onPress={() =>
            navigation.navigate('BookingConfirmation', {
              doctorId,
              slotId: selectedSlot,
              dateId: selectedDate,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerActions: { flexDirection: 'row', gap: SPACING.md },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -SPACING.sm,
  },
  content: { padding: SPACING.lg, paddingBottom: 100 },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...SHADOWS.soft },
  doctorRow: { flexDirection: 'row', gap: SPACING.md },
  photo: { width: 88, height: 88, borderRadius: RADIUS.md, backgroundColor: COLORS.inputBg },
  flex: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  name: { ...TYPOGRAPHY.body, fontWeight: '700' },
  specialty: { color: COLORS.link, ...TYPOGRAPHY.caption, marginTop: 2 },
  meta: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginTop: 2 },
  available: { ...TYPOGRAPHY.caption, color: COLORS.successLight, marginTop: 4 },
  feeCard: {
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  feeBadge: { backgroundColor: COLORS.priceBlueBg, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.md },
  feeAmount: { color: COLORS.primary, fontWeight: '700', fontSize: 18 },
  feeTitle: { color: COLORS.primary, fontWeight: '700' },
  feeSub: { ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  sectionTitle: { ...TYPOGRAPHY.body, marginTop: SPACING.lg, color: COLORS.primary, fontWeight: '700' },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SPACING.lg },
  paragraph: { marginTop: SPACING.sm, color: COLORS.textMuted, ...TYPOGRAPHY.bodySm, lineHeight: 20 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginTop: SPACING.sm },
  chip: { borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.pill, paddingHorizontal: SPACING.md, paddingVertical: 6 },
  chipText: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary },
  dateRow: { gap: SPACING.sm, paddingVertical: SPACING.sm },
  dateChip: { borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  dateChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dateText: { ...TYPOGRAPHY.caption, fontWeight: '600' },
  dateTextActive: { color: COLORS.white },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginTop: SPACING.sm },
  slot: { width: '31%', borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingVertical: SPACING.sm, alignItems: 'center' },
  slotActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  slotDisabled: { opacity: 0.45 },
  slotText: { ...TYPOGRAPHY.caption, fontWeight: '600' },
  slotTextActive: { color: COLORS.white },
  slotTextDisabled: { color: COLORS.textMuted },
  clinicCard: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.sm },
  mapThumb: { width: 88, height: 88, borderRadius: RADIUS.md, backgroundColor: COLORS.inputBg },
  clinicName: { color: COLORS.primary, fontWeight: '700' },
  clinicMeta: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginTop: 2 },
  link: { color: COLORS.verified, ...TYPOGRAPHY.caption, marginTop: 4 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: SPACING.lg },
  reviewRow: { flexDirection: 'row', gap: SPACING.lg, marginTop: SPACING.sm },
  ratingBig: { fontSize: 32, fontWeight: '700', color: COLORS.primary },
  reviewItem: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm },
  reviewAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.inputBg, alignItems: 'center', justifyContent: 'center' },
  reviewText: { ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  reviewAuthor: { ...TYPOGRAPHY.caption, color: COLORS.textLight, marginTop: 2 },
  reasonCard: { marginTop: SPACING.lg, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.lg, padding: SPACING.lg },
  footer: { position: 'absolute', right: SPACING.lg, bottom: SPACING.lg, left: SPACING.lg, alignItems: 'flex-end' },
  continueBtn: { paddingHorizontal: SPACING.xxxl, borderRadius: RADIUS.pill },
});
