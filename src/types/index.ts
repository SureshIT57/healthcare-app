import type { NavigatorScreenParams } from '@react-navigation/native';

export type Gender = 'Male' | 'Female' | 'Other';

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  countryCode: string;
  email?: string;
  dateOfBirth?: string;
  gender?: Gender;
  bloodGroup?: string;
  avatar?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar?: string;
  isSelf?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  degree: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  distanceKm: number;
  availableToday: boolean;
  consultationFee: number;
  clinicId: string;
  image?: string;
  verified?: boolean;
  about?: string;
  expertise?: string[];
  sectionId?: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  distanceKm: number;
  verified?: boolean;
}

export interface TimeSlot {
  id: string;
  label: string;
  available: boolean;
}

export interface DateOption {
  id: string;
  label: string;
  active?: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  status: AppointmentStatus;
  dateLabel: string;
  timeLabel: string;
  tokenNumber: string;
  tokenId: string;
  clinicId: string;
  badgeLabel?: string;
}

export interface Review {
  id: string;
  initial: string;
  text: string;
  author: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Otp: { phone: string; countryCode: string };
  CompleteProfile: undefined;
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Services: undefined;
  Appointment: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  ChooseDoctor: undefined;
  DoctorProfile: { doctorId: string };
  BookingConfirmation: { doctorId: string; slotId: string; dateId: string };
  PaymentSuccess: undefined;
  AppointmentPass: { appointmentId?: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Placeholder: { title: string };
};
