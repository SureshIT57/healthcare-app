import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dr20Logo } from '../components/Dr20Logo';
import { COLORS } from '../constants/theme';
import { getInitialAppRoute } from '../services/authStorage';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (!active) return;

      try {
        const route = await getInitialAppRoute();
        if (!active) return;
        navigation.replace(route);
      } catch {
        if (active) navigation.replace('Onboarding');
      }
    };

    bootstrap();
    return () => {
      active = false;
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Dr20Logo size={160} />
      <ActivityIndicator style={styles.loader} color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: { marginTop: 24 },
});
