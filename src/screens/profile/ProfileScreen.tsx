import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useMockFetch } from '../../hooks';
import { fetchCurrentUser, fetchFamilyMembers } from '../../services/mockApi';
import { clearRegistrationSession } from '../../services/authStorage';
import { resetToAuthFlow } from '../../navigation/navigationRef';
import { formatPhoneDisplay } from '../../utils/validation';
import type { ProfileStackParamList } from '../../types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;

const MENU = [
  'Help Center',
  'Contact Support',
  'Notifications',
  'Terms & Conditions',
  'Privacy Policy',
  'About Dr.20',
  'Rate the App',
  'Share Dr.20',
];

export function ProfileScreen({ navigation }: Props) {
  const { data: user } = useMockFetch(fetchCurrentUser, []);
  const { data: family } = useMockFetch(fetchFamilyMembers, []);

  const onLogout = async () => {
    await clearRegistrationSession();
    resetToAuthFlow();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Ionicons name="settings-outline" size={22} color={COLORS.black} />
        </View>

        <View style={styles.userCard}>
          <View style={styles.userRow}>
            <View style={styles.userPhoto} />
            <View>
              <Text style={styles.userName}>
                {user?.firstName} {user?.lastName}
              </Text>
              <Text style={styles.userPhone}>
                {formatPhoneDisplay(user?.countryCode ?? '+91', user?.phone ?? '')}
              </Text>
            </View>
          </View>
          <Pressable style={styles.editBtn}>
            <Ionicons name="pencil" size={14} color={COLORS.primary} />
            <Text style={styles.editText}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Family Members</Text>
          <Text style={styles.viewAll}>View All ›</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.familyRow}>
          {(family ?? []).map((member) => (
            <View key={member.id} style={styles.member}>
              <View style={styles.memberAvatar} />
              <Text style={styles.memberName}>{member.name}</Text>
              {member.isSelf ? (
                <View style={styles.youBadge}>
                  <Text style={styles.youText}>You</Text>
                </View>
              ) : null}
            </View>
          ))}
          <View style={styles.member}>
            <View style={styles.addMember}>
              <Ionicons name="add" size={22} color={COLORS.primary} />
            </View>
            <Text style={styles.memberName}>Add Member</Text>
          </View>
        </ScrollView>

        {MENU.map((item) => (
          <Pressable
            key={item}
            style={styles.menuRow}
            onPress={() => navigation.navigate('Placeholder', { title: item })}
          >
            <Ionicons name="settings-outline" size={18} color={COLORS.black} />
            <Text style={styles.menuText}>{item}</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.borderLight} />
          </Pressable>
        ))}

        <Pressable style={styles.logout} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={18} color={COLORS.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundAlt },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  headerTitle: { ...TYPOGRAPHY.h1, fontWeight: '700' },
  userCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, padding: SPACING.lg, ...SHADOWS.soft },
  userRow: { flexDirection: 'row', gap: SPACING.md, alignItems: 'center' },
  userPhoto: { width: 64, height: 64, borderRadius: RADIUS.lg, backgroundColor: COLORS.inputBg },
  userName: { ...TYPOGRAPHY.body, fontWeight: '700' },
  userPhone: { ...TYPOGRAPHY.bodySm, color: COLORS.textMuted, marginTop: 2 },
  editBtn: {
    marginTop: SPACING.lg,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  editText: { ...TYPOGRAPHY.bodySm, color: COLORS.primary, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: SPACING.xxl, marginBottom: SPACING.md },
  sectionTitle: { ...TYPOGRAPHY.body, fontWeight: '700' },
  viewAll: { ...TYPOGRAPHY.bodySm, color: COLORS.primary, fontWeight: '600' },
  familyRow: { gap: SPACING.lg, paddingBottom: SPACING.sm },
  member: { alignItems: 'center', width: 72 },
  memberAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.inputBg },
  memberName: { ...TYPOGRAPHY.caption, marginTop: SPACING.sm, textAlign: 'center' },
  youBadge: { marginTop: 4, backgroundColor: COLORS.priceBlueBg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: RADIUS.pill },
  youText: { ...TYPOGRAPHY.caption, color: COLORS.verified, fontWeight: '600' },
  addMember: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuText: { flex: 1, ...TYPOGRAPHY.bodySm },
  logout: { flexDirection: 'row', justifyContent: 'center', gap: SPACING.sm, marginTop: SPACING.xxl },
  logoutText: { ...TYPOGRAPHY.body, color: COLORS.error, fontWeight: '700' },
});
