import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme/colors';
import { upcomingAppointment } from '../data/dummyData';

export function UpcomingAppointment() {
  const appt = upcomingAppointment;

  return (
    <View style={styles.section}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <Ionicons name="calendar" size={18} color={colors.primary} />
            <Text style={styles.headerTitle}>Upcoming Appointment</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{appt.badge}</Text>
          </View>
        </View>

        <View style={styles.doctorRow}>
          <View style={styles.doctorAvatar}>
            <Text style={styles.doctorInitials}>{appt.doctor.initials}</Text>
          </View>
          <View>
            <Text style={styles.doctorName}>{appt.doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{appt.doctor.specialty}</Text>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          <DetailItem label="Date" value={appt.date} />
          <DetailItem label="Time" value={appt.time} />
          <DetailItem label="Patient" value={appt.patient} />
        </View>

        <View style={styles.tokenRow}>
          <Text style={styles.tokenLabel}>Token #{appt.token}</Text>
          <View style={styles.qrPlaceholder}>
            <Ionicons name="qr-code" size={40} color={colors.text} />
          </View>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.locationText}>{appt.location}</Text>
        </View>

        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85}>
          <Text style={styles.ctaText}>View Appointment</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  badge: {
    backgroundColor: colors.badgeBlue,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  badgeText: {
    color: colors.badgeBlueText,
    fontSize: 12,
    fontWeight: '600',
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorInitials: {
    fontWeight: '700',
    color: colors.primary,
    fontSize: 16,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  doctorSpecialty: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tokenLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  qrPlaceholder: {
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: radius.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: spacing.lg,
  },
  locationText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  ctaText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});
