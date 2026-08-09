import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import type { Doctor } from '../../types';

type Props = {
  doctor: Doctor;
  feeVariant: 'blue' | 'peach';
  onProfile: () => void;
  onBook: () => void;
};

export const ChooseDoctorCard = memo(function ChooseDoctorCard({
  doctor,
  feeVariant,
  onProfile,
  onBook,
}: Props) {
  const feeBg = feeVariant === 'blue' ? COLORS.priceBlueBg : COLORS.pricePeachBg;
  const feeColor = feeVariant === 'blue' ? COLORS.primary : COLORS.pricePeachText;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.clinicPill}>
          <MaterialCommunityIcons name="hospital-building" size={14} color={COLORS.primary} />
          <Text style={styles.clinicName}>Arokya Clinic</Text>
        </View>
        <View style={[styles.feePill, { backgroundColor: feeBg }]}>
          <Text style={[styles.feeText, { color: feeColor }]}>₹{doctor.consultationFee}</Text>
        </View>
      </View>
      <View style={styles.verifyRow}>
        <Ionicons name="checkmark-circle" size={14} color={COLORS.verified} />
        <Text style={styles.verified}>Verified Clinic</Text>
      </View>

      <View style={styles.doctorRow}>
        <View style={styles.avatar} />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.verified} />
          </View>
          <Text style={styles.degree}>
            {doctor.degree} - {doctor.specialty}
          </Text>
          <Text style={styles.meta}>
            ★ {doctor.rating} ({doctor.reviewCount.toLocaleString()} Reviews)
          </Text>
          <Text style={styles.meta}>{doctor.experienceYears}+ yrs exp · {doctor.distanceKm}km away</Text>
          {doctor.availableToday ? (
            <Text style={styles.available}>● Available Today</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={[styles.actionBtn, styles.outlineBtn]} onPress={onProfile}>
          <Ionicons name="person-outline" size={16} color={COLORS.primary} />
          <Text style={styles.outlineText}>Doctor Profile</Text>
        </Pressable>
        <Pressable style={[styles.actionBtn, styles.primaryBtn]} onPress={onBook}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.white} />
          <Text style={styles.primaryText}>Book now</Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.card,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  clinicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  clinicName: { ...TYPOGRAPHY.caption, fontWeight: '600', color: COLORS.primary },
  feePill: { paddingHorizontal: SPACING.md, paddingVertical: 4, borderRadius: RADIUS.sm },
  feeText: { ...TYPOGRAPHY.bodySm, fontWeight: '700' },
  verifyRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: SPACING.sm },
  verified: { ...TYPOGRAPHY.caption, color: COLORS.verified },
  doctorRow: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.md },
  avatar: { width: 72, height: 96, borderRadius: RADIUS.md, backgroundColor: COLORS.inputBg },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  name: { ...TYPOGRAPHY.body, fontWeight: '700', color: COLORS.black },
  degree: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginTop: 2 },
  meta: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginTop: 2 },
  available: { ...TYPOGRAPHY.caption, color: COLORS.successLight, marginTop: 4, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.lg },
  actionBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  outlineBtn: { borderWidth: 1.5, borderColor: COLORS.primary },
  outlineText: { ...TYPOGRAPHY.caption, color: COLORS.primary, fontWeight: '700' },
  primaryBtn: { backgroundColor: COLORS.primary },
  primaryText: { ...TYPOGRAPHY.caption, color: COLORS.white, fontWeight: '700' },
});
