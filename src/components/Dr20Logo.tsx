import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { dr20Logo } from '../assets/images';

type Props = {
  /** Logo width; height scales with the asset aspect ratio (~1.15). */
  size?: number;
};

export const Dr20Logo = memo(function Dr20Logo({ size = 120 }: Props) {
  const height = Math.round(size * 1.15);
  return (
    <Image
      source={dr20Logo}
      style={[styles.logo, { width: size, height }]}
      resizeMode="contain"
      accessibilityLabel="Dr20 logo"
    />
  );
});

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
});
