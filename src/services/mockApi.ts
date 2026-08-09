import usersData from '../data/users.json';
import doctorsData from '../data/doctors.json';
import appointmentsData from '../data/appointments.json';
import notificationsData from '../data/notifications.json';
import type { Appointment, Doctor, Clinic, FamilyMember, Review, TimeSlot, DateOption, User } from '../types';

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCurrentUser(): Promise<User> {
  await delay();
  return usersData.currentUser as User;
}

export async function fetchFamilyMembers(): Promise<FamilyMember[]> {
  await delay(200);
  return usersData.familyMembers as FamilyMember[];
}

export async function fetchDoctors(): Promise<Doctor[]> {
  await delay();
  return doctorsData.doctors as Doctor[];
}

export async function fetchDoctorById(id: string): Promise<Doctor | undefined> {
  await delay(200);
  return (doctorsData.doctors as Doctor[]).find((d) => d.id === id);
}

export async function fetchClinicById(id: string): Promise<Clinic | undefined> {
  await delay(100);
  return (doctorsData.clinics as Clinic[]).find((c) => c.id === id);
}

export async function fetchClinics(): Promise<Clinic[]> {
  await delay(100);
  return doctorsData.clinics as Clinic[];
}

export async function fetchAppointments(): Promise<Appointment[]> {
  await delay();
  return appointmentsData.appointments as Appointment[];
}

export async function fetchAppointmentById(id: string): Promise<Appointment | undefined> {
  await delay(200);
  return (appointmentsData.appointments as Appointment[]).find((a) => a.id === id);
}

export async function fetchDateOptions(): Promise<DateOption[]> {
  await delay(100);
  return doctorsData.dateOptions as DateOption[];
}

export async function fetchTimeSlots(): Promise<TimeSlot[]> {
  await delay(100);
  return doctorsData.slots as TimeSlot[];
}

export async function fetchReviews(): Promise<Review[]> {
  await delay(100);
  return doctorsData.reviews as Review[];
}

export async function sendOtp(_phone: string): Promise<{ success: boolean }> {
  await delay(800);
  return { success: true };
}

export async function verifyOtp(_code: string): Promise<{ success: boolean }> {
  await delay(600);
  return { success: _code.length === 6 };
}

export async function createProfile(_payload: Partial<User>): Promise<{ success: boolean }> {
  await delay(900);
  return { success: true };
}

export async function confirmPayment(): Promise<{ success: boolean; appointmentId: string }> {
  await delay(1200);
  return { success: true, appointmentId: 'a1' };
}

export function getDoctorSections() {
  return doctorsData.sections;
}

export function getDefaultLocation(): string {
  return doctorsData.location;
}

export async function fetchNotifications() {
  await delay(300);
  return notificationsData.notifications;
}
