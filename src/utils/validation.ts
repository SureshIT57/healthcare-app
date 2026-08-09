export function formatPhoneDisplay(countryCode: string, phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length <= 5) return `${countryCode} ${digits}`;
  return `${countryCode} ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}: ${String(s).padStart(2, '0')}`;
}

export function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return 'Phone number is required';
  if (digits.length < 8) return 'Enter a valid mobile number';
  return null;
}

export function validateOtp(code: string): string | null {
  if (code.length !== 6) return 'Enter the 6-digit OTP';
  if (!/^\d+$/.test(code)) return 'OTP must contain numbers only';
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email';
  return null;
}
