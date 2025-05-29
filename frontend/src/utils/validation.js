export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name) => {
  return name.length >= 2 && name.length <= 50;
};

export const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

export const getPasswordStrengthLabel = (strength) => {
  switch (strength) {
    case 0:
    case 1:
      return { label: 'Very Weak', color: 'text-red-500' };
    case 2:
      return { label: 'Weak', color: 'text-orange-500' };
    case 3:
      return { label: 'Medium', color: 'text-yellow-500' };
    case 4:
      return { label: 'Strong', color: 'text-green-500' };
    case 5:
      return { label: 'Very Strong', color: 'text-emerald-500' };
    default:
      return { label: 'Very Weak', color: 'text-red-500' };
  }
}; 