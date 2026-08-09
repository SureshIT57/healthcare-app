import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TealHeader } from '../../components/ui/TealHeader';
import { FilterChips } from '../../components/ui/FilterChips';
import { ChooseDoctorCard } from '../../components/booking/ChooseDoctorCard';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useMockFetch } from '../../hooks';
import { fetchDoctors, getDefaultLocation, getDoctorSections } from '../../services/mockApi';
import type { Doctor } from '../../types';
import type { HomeStackParamList } from '../../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ChooseDoctor'>;

export function ChooseDoctorScreen({ navigation }: Props) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const { data: doctors, loading, refreshing, refresh } = useMockFetch(fetchDoctors, []);

  const sections = useMemo(() => {
    const all = doctors ?? [];
    const filtered = all.filter((d) => {
      const matchesQuery =
        !query.trim() ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.specialty.toLowerCase().includes(query.toLowerCase());
      const matchesFilter =
        filter === 'All' ||
        (filter === 'Male' && d.name.includes('Arun')) ||
        (filter === 'Female' && !d.name.includes('Arun')) ||
        filter === 'Rating' ||
        filter === 'Availability';
      return matchesQuery && matchesFilter;
    });

    return getDoctorSections()
      .map((section) => ({
        ...section,
        data: filtered.filter((d) => d.sectionId === section.id),
      }))
      .filter((s) => s.data.length > 0);
  }, [doctors, filter, query]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.headerArea}>
        <TealHeader
          title="Choose a Doctor"
          subtitle="Trusted doctors near you"
          rightAction={
            <Pressable style={styles.locationPill}>
              <Ionicons name="location" size={14} color={COLORS.verified} />
              <Text style={styles.locationText}>{getDefaultLocation()}</Text>
              <Ionicons name="chevron-down" size={14} color={COLORS.white} />
            </Pressable>
          }
        />
      </View>
      <View style={styles.searchWrap}>
        <TextInput
          placeholder="Search doctors..."
          placeholderTextColor={COLORS.textMuted}
          style={styles.search}
          value={query}
          onChangeText={setQuery}
        />
        <Ionicons name="search" size={20} color={COLORS.textMuted} />
      </View>

      <View style={styles.filters}>
        <FilterChips
          options={['All', 'Male', 'Female', 'Rating', 'Availability']}
          selected={filter}
          onSelect={setFilter}
        />
        <Pressable>
          <Ionicons name="close" size={20} color={COLORS.textSecondary} />
        </Pressable>
      </View>

      {loading && !doctors ? (
        <ActivityIndicator style={styles.loader} color={COLORS.primary} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item: Doctor) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
          contentContainerStyle={styles.list}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
          )}
          renderItem={({ item, section }) => (
            <ChooseDoctorCard
              doctor={item}
              feeVariant={section.feeVariant as 'blue' | 'peach'}
              onProfile={() => navigation.navigate('DoctorProfile', { doctorId: item.id })}
              onBook={() =>
                navigation.navigate('DoctorProfile', { doctorId: item.id })
              }
            />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No doctors found</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.screenBg },
  headerArea: { backgroundColor: COLORS.primary },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: { color: COLORS.white, ...TYPOGRAPHY.caption, fontWeight: '600' },
  searchWrap: {
    marginTop: -SPACING.lg,
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    minHeight: 48,
    ...TYPOGRAPHY.bodySm,
  },
  search: { flex: 1, ...TYPOGRAPHY.bodySm, color: COLORS.black },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  list: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxxl },
  sectionHeader: { marginTop: SPACING.lg, marginBottom: SPACING.sm },
  sectionTitle: { color: COLORS.primary, ...TYPOGRAPHY.h3 },
  sectionSubtitle: { color: COLORS.textMuted, ...TYPOGRAPHY.caption, marginTop: 2 },
  loader: { marginTop: 40 },
  empty: { textAlign: 'center', marginTop: 40, color: COLORS.textMuted },
});
