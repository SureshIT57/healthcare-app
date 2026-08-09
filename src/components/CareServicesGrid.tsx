import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme/colors';
import { careServices } from '../data/dummyData';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  'heart-pulse': 'heart',
  people: 'people',
  fitness: 'body',
  flask: 'flask',
};

export function CareServicesGrid() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Explore Care Services</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {careServices.map((service) => (
          <TouchableOpacity key={service.id} style={styles.item} activeOpacity={0.8}>
            <View style={styles.iconCircle}>
              <Ionicons
                name={iconMap[service.icon] ?? 'medical'}
                size={24}
                color={colors.primary}
              />
            </View>
            <Text style={styles.label}>{service.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  scroll: {
    gap: spacing.lg,
    paddingRight: spacing.lg,
  },
  item: {
    alignItems: 'center',
    width: 72,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 11,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
});
