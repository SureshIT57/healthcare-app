import React, { memo } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { heroBanner, user } from '../../data/dummyData';
import { homeImages } from '../../assets/images';

export const HomeTopSection = memo(function HomeTopSection() {
  return (
    <View style={styles.container}>
      <View style={styles.blobTopRight} />
      <View style={styles.blobMidLeft} />
      <View style={styles.blobBottomRight} />

      <View style={styles.topRow}>
        <Text style={styles.greeting}>Hello {user.name}</Text>
        <View style={styles.avatarWrap}>
          <Image source={homeImages.avatar} style={styles.avatarImage} resizeMode="cover" />
        </View>
      </View>

      <Pressable style={styles.locationPill}>
        <Ionicons name="location" size={16} color={COLORS.primary} />
        <Text style={styles.locationText}>{user.location}</Text>
        <Ionicons name="chevron-down" size={16} color={COLORS.textLabel} />
      </Pressable>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search doctors, services, symptoms..."
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
        />
        <Ionicons name="search" size={20} color={COLORS.black} />
      </View>

      <View style={styles.heroRow}>
        <View style={styles.heroCopy}>
          <Text style={styles.heroTitle}>{heroBanner.title}</Text>
          <Text style={styles.heroSubtitle}>{heroBanner.subtitle}</Text>
          <Pressable style={styles.heroButton}>
            <Text style={styles.heroButtonText}>{heroBanner.cta}</Text>
          </Pressable>
        </View>
        <Image source={homeImages.heroIllustration} style={styles.heroImage} resizeMode="contain" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xxl,
    borderBottomLeftRadius: RADIUS.xxl,
    borderBottomRightRadius: RADIUS.xxl,
    overflow: 'hidden',
  },
  blobTopRight: {
    position: 'absolute',
    top: -70,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  blobMidLeft: {
    position: 'absolute',
    top: 120,
    left: -90,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  blobBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  greeting: {
    color: COLORS.white,
    ...TYPOGRAPHY.h3,
    fontWeight: '700',
  },
  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
    backgroundColor: '#7EC8E3',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    gap: 6,
    marginBottom: SPACING.lg,
  },
  locationText: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    minHeight: 52,
    marginBottom: SPACING.xl,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.bodySm,
    color: COLORS.black,
    paddingVertical: SPACING.md,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  heroCopy: {
    flex: 1,
    paddingRight: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: SPACING.sm,
  },
  heroSubtitle: {
    color: '#C8E7EE',
    ...TYPOGRAPHY.caption,
    lineHeight: 18,
    marginBottom: SPACING.lg,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
  },
  heroButtonText: {
    ...TYPOGRAPHY.bodySm,
    color: COLORS.primary,
    fontWeight: '700',
  },
  heroImage: {
    width: 140,
    height: 148,
    marginBottom: -SPACING.md,
  },
});
