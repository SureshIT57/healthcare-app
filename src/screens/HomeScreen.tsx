import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HomeTopSection } from '../components/home/HomeTopSection';
import { QuickLinks } from '../components/QuickLinks';
import { UpcomingAppointment } from '../components/UpcomingAppointment';
import { CareServicesGrid } from '../components/CareServicesGrid';
import { SectionHeader } from '../components/SectionHeader';
import { DoctorCard } from '../components/DoctorCard';
import { PromoBanner } from '../components/PromoBanner';
import { doctors } from '../data/dummyData';
import { COLORS, SPACING } from '../constants/theme';

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HomeTopSection />

        <View style={styles.body}>
          <QuickLinks />
          <UpcomingAppointment />
          <CareServicesGrid />

          <View style={styles.doctorsSection}>
            <SectionHeader title="Consult at ₹20" />
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </View>

          <PromoBanner />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: SPACING.xxl,
  },
  body: {
    paddingHorizontal: SPACING.lg,
  },
  doctorsSection: {
    marginTop: SPACING.xl,
  },
});
