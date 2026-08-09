import React, { memo, ReactNode } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

type Props = {
  visible: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  children: ReactNode;
};

export const CommonPickerDialog = memo(function CommonPickerDialog({
  visible,
  title,
  onClose,
  onConfirm,
  confirmLabel = 'OK',
  children,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close dialog" />
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.body}>{children}</View>
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.cancelBtn]} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.confirmBtn]} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  dialog: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingTop: SPACING.lg,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  body: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  btn: {
    flex: 1,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: COLORS.border,
  },
  confirmBtn: {},
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted, fontWeight: '600' },
  confirmText: { ...TYPOGRAPHY.body, color: COLORS.primary, fontWeight: '700' },
});
