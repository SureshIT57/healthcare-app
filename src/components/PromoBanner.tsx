import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme/colors';
import { promoBanner } from '../data/dummyData';

export function PromoBanner() {
  return (
    <LinearGradient
      colors={['#B8E6E8', '#E0F7FA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{promoBanner.title}</Text>
        <TouchableOpacity style={styles.cta} activeOpacity={0.85}>
          <Text style={styles.ctaText}>{promoBanner.cta}</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.icons}>
        <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
        <Ionicons name="heart" size={20} color="#FF6B8A" />
        <Ionicons name="medkit" size={28} color={colors.primaryDark} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryDark,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  icons: {
    alignItems: 'center',
    gap: 6,
    paddingLeft: spacing.md,
  },
});
