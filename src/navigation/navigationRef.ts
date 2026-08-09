import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '../types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/** Reset the app to the main tab dashboard (Home and bottom tabs). */
export function resetToMainDashboard() {
  if (!navigationRef.isReady()) {
    return false;
  }

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    }),
  );
  return true;
}

/** After logout — show Login (skip onboarding if already completed). */
export function resetToAuthFlow() {
  if (!navigationRef.isReady()) {
    return false;
  }

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    }),
  );
  return true;
}
