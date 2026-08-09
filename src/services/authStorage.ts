import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  onboardingComplete: '@dr20/onboarding_complete',
  registrationComplete: '@dr20/registration_complete',
} as const;

export async function isOnboardingComplete(): Promise<boolean> {
  const value = await AsyncStorage.getItem(KEYS.onboardingComplete);
  return value === 'true';
}

export async function setOnboardingComplete(): Promise<void> {
  await AsyncStorage.setItem(KEYS.onboardingComplete, 'true');
}

export async function isRegistrationComplete(): Promise<boolean> {
  const value = await AsyncStorage.getItem(KEYS.registrationComplete);
  return value === 'true';
}

export async function setRegistrationComplete(): Promise<void> {
  await AsyncStorage.setItem(KEYS.registrationComplete, 'true');
}

/** Clears login/registration so user sees Login again (keeps onboarding done). */
export async function clearRegistrationSession(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.registrationComplete);
}

export async function getInitialAppRoute(): Promise<'Main' | 'Auth' | 'Onboarding'> {
  if (await isRegistrationComplete()) {
    return 'Main';
  }
  if (await isOnboardingComplete()) {
    return 'Auth';
  }
  return 'Onboarding';
}
