import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../types';
import { HomeScreen } from '../screens/HomeScreen';
import { ChooseDoctorScreen } from '../screens/booking/ChooseDoctorScreen';
import { DoctorProfileScreen } from '../screens/booking/DoctorProfileScreen';
import { BookingConfirmationScreen } from '../screens/booking/BookingConfirmationScreen';
import { PaymentSuccessScreen } from '../screens/booking/PaymentSuccessScreen';
import { AppointmentPassScreen } from '../screens/booking/AppointmentPassScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ChooseDoctor" component={ChooseDoctorScreen} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen name="AppointmentPass" component={AppointmentPassScreen} />
    </Stack.Navigator>
  );
}
