import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppointmentListScreen } from '../screens/appointments/AppointmentListScreen';
import { AppointmentPassScreen } from '../screens/booking/AppointmentPassScreen';

export type AppointmentStackParamList = {
  AppointmentList: undefined;
  AppointmentPass: { appointmentId?: string };
};

const Stack = createNativeStackNavigator<AppointmentStackParamList>();

export function AppointmentStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppointmentList" component={AppointmentListScreen} />
      <Stack.Screen name="AppointmentPass" component={AppointmentPassScreen} />
    </Stack.Navigator>
  );
}
