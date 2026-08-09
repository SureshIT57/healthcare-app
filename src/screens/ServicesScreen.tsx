import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenContainer } from '../components/ui/ScreenContainer';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import type { MainTabParamList } from '../types';

export function ServicesScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  return (
    <ScreenContainer backgroundColor={COLORS.background}>
      <View style={styles.content}>
        <Text style={styles.title}>Healthcare Services</Text>
        <Text style={styles.subtitle}>Book doctors, lab tests, and home care from one place.</Text>
        <PrimaryButton
          title="Choose a Doctor"
          onPress={() => navigation.navigate('Home', { screen: 'ChooseDoctor' })}
          style={styles.cta}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, padding: SPACING.xxl, justifyContent: 'center' },
  title: { ...TYPOGRAPHY.h2, color: COLORS.primary, fontWeight: '700' },
  subtitle: { marginTop: SPACING.md, ...TYPOGRAPHY.bodySm, color: COLORS.textMuted, lineHeight: 22 },
  cta: { marginTop: SPACING.xxxl },
});
