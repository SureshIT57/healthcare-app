import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { PaginationDots } from '../../components/ui/PaginationDots';
import { onboardingImages } from '../../assets/images';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { setOnboardingComplete } from '../../services/authStorage';
import type { RootStackParamList } from '../../types';

const { width, height } = Dimensions.get('window');
const HERO_WIDTH = width - SPACING.xxl * 2;
const HERO_HEIGHT = Math.min(width * 0.68, height * 0.32);

const SLIDES = [
  {
    id: '1',
    title: 'Affordable Healthcare for Everyone',
    body: 'Consult certified doctors, book lab tests, and access trusted healthcare services at affordable prices.',
    image: onboardingImages.slide1,
  },
  {
    id: '2',
    title: 'Professional Care at Your Doorstep',
    body: 'Get nursing care, physiotherapy, elder care, and home medical support without visiting hospitals.',
    image: onboardingImages.slide2,
  },
  {
    id: '3',
    title: 'Fast Help When You Need It',
    body: 'Book ambulances, track appointments, and connect with healthcare professionals anytime, anywhere.',
    image: onboardingImages.slide3,
  },
] as const;

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<(typeof SLIDES)[number]>>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(next);
  };

  const finishOnboarding = async () => {
    await setOnboardingComplete();
    navigation.replace('Auth');
  };

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
      setIndex(index + 1);
    } else {
      finishOnboarding();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      <View style={styles.topBar}>
        {index < 2 ? (
          <Pressable style={styles.skip} onPress={() => finishOnboarding()}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        ) : (
          <View style={styles.skipPlaceholder} />
        )}
      </View>

      <View style={styles.content}>
        <FlatList
          ref={listRef}
          style={styles.list}
          data={[...SLIDES]}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScroll}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width }]}>
              <View style={styles.slideInner}>
                <Image source={item.image} style={styles.hero} resizeMode="contain" />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.bottom}>
        <PaginationDots activeIndex={index} />
        <View style={styles.footer}>
          {index === SLIDES.length - 1 ? (
            <View style={styles.dualRow}>
              <PrimaryButton
                title="Back"
                variant="ghost"
                fullWidth={false}
                style={styles.backBtn}
                onPress={() => {
                  listRef.current?.scrollToIndex({ index: 1, animated: true });
                  setIndex(1);
                }}
              />
              <PrimaryButton
                title="Get Started"
                style={styles.startBtn}
                onPress={() => finishOnboarding()}
              />
            </View>
          ) : (
            <PrimaryButton title="Next" onPress={goNext} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  skip: {
    backgroundColor: COLORS.skipBg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  skipPlaceholder: {
    height: 36,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.sm,
    minHeight: 40,
  },
  skipText: { color: COLORS.primary, fontWeight: '600' },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  slideInner: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    width: HERO_WIDTH,
    height: HERO_HEIGHT,
    alignSelf: 'center',
  },
  title: {
    marginTop: SPACING.xl,
    textAlign: 'center',
    alignSelf: 'center',
    color: COLORS.primary,
    ...TYPOGRAPHY.h2,
    fontWeight: '700',
  },
  body: {
    marginTop: SPACING.md,
    textAlign: 'center',
    alignSelf: 'center',
    color: COLORS.textSecondary,
    ...TYPOGRAPHY.bodySm,
    lineHeight: 22,
    paddingHorizontal: SPACING.sm,
    maxWidth: 340,
  },
  bottom: {
    alignItems: 'center',
    paddingBottom: SPACING.sm,
  },
  footer: {
    width: '100%',
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  dualRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  backBtn: { flex: 1 },
  startBtn: { flex: 1.2 },
});
