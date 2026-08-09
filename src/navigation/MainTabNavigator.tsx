import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { MainTabParamList } from '../types';
import { COLORS, TYPOGRAPHY } from '../constants/theme';
import { HomeStackNavigator } from './HomeStackNavigator';
import { AppointmentStackNavigator } from './AppointmentStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';
import { ServicesScreen } from '../screens/ServicesScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.tabInactive,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          height: 62,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: TYPOGRAPHY.tab,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Services') {
            return <MaterialCommunityIcons name="stethoscope" size={size} color={color} />;
          }
          const map: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: 'home-outline',
            Appointment: 'calendar-outline',
            Profile: 'person-outline',
          };
          return <Ionicons name={map[route.name] ?? 'ellipse'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Appointment" component={AppointmentStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}
