import React, { memo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

type Props = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export const FilterChips = memo(function FilterChips({ options, selected, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {options.map((option) => {
        const active = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{option}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  row: { gap: SPACING.sm, paddingVertical: SPACING.sm },
  chip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    backgroundColor: '#ECEFF1',
  },
  chipActive: { backgroundColor: COLORS.primary },
  chipText: { ...TYPOGRAPHY.bodySm, color: COLORS.textSecondary, fontWeight: '600' },
  chipTextActive: { color: COLORS.white },
});
