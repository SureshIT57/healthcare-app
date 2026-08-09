import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';

type Props = {
  count?: number;
  activeIndex: number;
};

export const PaginationDots = memo(function PaginationDots({ count = 3, activeIndex }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={[styles.dot, index === activeIndex && styles.dotActive]} />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', gap: SPACING.sm },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.borderLight,
  },
  dotActive: { backgroundColor: COLORS.primary, width: 10, height: 10, borderRadius: 5 },
});
