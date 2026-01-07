// src/utils/simpleValidation.js

// Simple validation rules
export const validateField = (name, value) => {
  if (!value || value.trim() === '') {
    return `${name.replace(/([A-Z])/g, ' $1')} is required`;
  }
  
  switch (name) {
    case 'email':
      if (!/^\S+@\S+\.\S+$/.test(value)) return 'Enter valid email';
      break;
    case 'phone':
      if (!/^\d{10,15}$/.test(value)) return 'Enter 10-15 digit phone';
      break;
    case 'address':
      if (value.length < 10) return 'Address too short (min 10 chars)';
      break;
  }
  
  return '';
};