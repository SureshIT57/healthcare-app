import React, { memo, ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/theme';

type Props = ViewProps & {
  children: ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  backgroundColor?: string;
};

export const ScreenContainer = memo(function ScreenContainer({
  children,
  edges = ['top', 'bottom'],
  backgroundColor = COLORS.white,
  style,
  ...rest
}: Props) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]} edges={edges}>
      <View style={[styles.inner, { backgroundColor }, style]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safe: { flex: 1 },
  inner: { flex: 1 },
});
