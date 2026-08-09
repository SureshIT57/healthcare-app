import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme/colors';
import { heroBanner } from '../data/dummyData';

export function HeroBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{heroBanner.title}</Text>
        <Text style={styles.subtitle}>{heroBanner.subtitle}</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.85}>
          <Text style={styles.buttonText}>{heroBanner.cta}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.illustration}>
        <Ionicons name="medkit" size={36} color={colors.lightTeal} />
        <Ionicons name="heart" size={28} color="#FF6B8A" style={styles.heartIcon} />
        <View style={styles.doctorRow}>
          <View style={styles.doctorCircle}>
            <Ionicons name="person" size={22} color={colors.white} />
          </View>
          <View style={[styles.doctorCircle, styles.doctorCircleAlt]}>
            <Ionicons name="person" size={22} color={colors.white} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    overflow: 'hidden',
    marginTop: -spacing.lg,
  },
  content: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.sm,
    lineHeight: 24,
  },
  subtitle: {
    color: '#B8E6E8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  buttonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  illustration: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    marginVertical: 4,
  },
  doctorRow: {
    flexDirection: 'row',
    gap: 4,
  },
  doctorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorCircleAlt: {
    backgroundColor: '#FF8FA3',
  },
});
