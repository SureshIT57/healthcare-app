import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme/colors';
import { quickLinks } from '../data/dummyData';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  medical: 'medical',
  'home-health': 'home',
};

export function QuickLinks() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>What Do You Need Today?</Text>
          <Text style={styles.sectionSubtitle}>Book trusted healthcare services instantly</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {quickLinks.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { backgroundColor: item.backgroundColor }]}
            activeOpacity={0.85}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.iconWrap}>
              <Ionicons name={iconMap[item.icon] ?? 'medical'} size={32} color={colors.primary} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textSecondary,
  },
  seeAll: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  card: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    minHeight: 110,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  iconWrap: {
    alignSelf: 'flex-end',
  },
});
