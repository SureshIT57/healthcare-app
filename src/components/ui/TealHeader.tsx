import React, { memo, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: ReactNode;
  showBack?: boolean;
};

export const TealHeader = memo(function TealHeader({
  title,
  subtitle,
  onBack,
  rightAction,
  showBack = true,
}: Props) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + SPACING.sm }]}>
      <View style={styles.topRow}>
        {showBack ? (
          <Pressable
            accessibilityRole="button"
            onPress={onBack ?? (() => navigation.goBack())}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
          >
            <Ionicons name="arrow-back" size={20} color={COLORS.white} />
          </Pressable>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        {rightAction ?? <View style={styles.backPlaceholder} />}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPlaceholder: { width: 40, height: 40 },
  pressed: { opacity: 0.85 },
  title: { ...TYPOGRAPHY.h2, color: COLORS.white, fontWeight: '700' },
  subtitle: { marginTop: SPACING.xs, ...TYPOGRAPHY.bodySm, color: 'rgba(255,255,255,0.85)' },
});
