import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme/colors';

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  distance: string;
  clinic: string;
  verified: boolean;
  availableToday: boolean;
  consultationFee: number;
  initials: string;
};

type Props = {
  doctor: Doctor;
};

export function DoctorCard({ doctor }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.clinicRow}>
          <Text style={styles.clinicName}>{doctor.clinic}</Text>
          {doctor.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={12} color={colors.verified} />
              <Text style={styles.verifiedText}>Verified Clinic</Text>
            </View>
          )}
        </View>
        <View style={styles.feeBadge}>
          <Text style={styles.feeText}>₹{doctor.consultationFee} Consultation Fee</Text>
        </View>
      </View>

      <View style={styles.mainRow}>
        <View style={styles.photo}>
          <Text style={styles.initials}>{doctor.initials}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.metaText}>
              {doctor.rating} ({doctor.reviews.toLocaleString()} Reviews)
            </Text>
          </View>
          <Text style={styles.metaText}>
            {doctor.experience} · {doctor.distance}
          </Text>
          {doctor.availableToday && (
            <View style={styles.availableRow}>
              <View style={styles.availableDot} />
              <Text style={styles.availableText}>Available Today</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.outlineButton} activeOpacity={0.85}>
          <Text style={styles.outlineButtonText}>Doctor Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
          <Text style={styles.primaryButtonText}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  clinicRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  clinicName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  verifiedText: {
    fontSize: 11,
    color: colors.verified,
    fontWeight: '600',
  },
  feeBadge: {
    backgroundColor: colors.priceBadge,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  feeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.priceBadgeText,
  },
  mainRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  photo: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    backgroundColor: colors.lightTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  specialty: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  availableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  availableDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.available,
  },
  availableText: {
    fontSize: 12,
    color: colors.available,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  outlineButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
});
