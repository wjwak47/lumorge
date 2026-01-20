import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: any) => boolean | string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = useCallback((name: string, value: any): string => {
    const rule = rules[name];
    if (!rule) return '';

    // Required validation
    if (rule.required && (!value || value.toString().trim() === '')) {
      return 'This field is required';
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') {
      return '';
    }

    // Min length validation
    if (rule.minLength && value.toString().length < rule.minLength) {
      return `Minimum ${rule.minLength} characters required`;
    }

    // Max length validation
    if (rule.maxLength && value.toString().length > rule.maxLength) {
      return `Maximum ${rule.maxLength} characters allowed`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value.toString())) {
      return 'Invalid format';
    }

    // Custom validation
    if (rule.validate) {
      const result = rule.validate(value);
      if (typeof result === 'string') {
        return result;
      }
      if (!result) {
        return 'Invalid value';
      }
    }

    return '';
  }, [rules]);

  const validateForm = useCallback((formData: { [key: string]: any }): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules, validateField]);

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleChange = useCallback((name: string, value: any, formData: { [key: string]: any }) => {
    // Only validate if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateForm,
    validateField,
    handleBlur,
    handleChange,
    clearErrors
  };
};

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]+$/,
  url: /^https?:\/\/.+/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alpha: /^[a-zA-Z]+$/,
  numeric: /^\d+$/
};

// Common validation rules
export const COMMON_RULES = {
  email: {
    required: true,
    pattern: VALIDATION_PATTERNS.email,
    validate: (value: string) => {
      if (!VALIDATION_PATTERNS.email.test(value)) {
        return 'Please enter a valid email address';
      }
      return true;
    }
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    validate: (value: string) => {
      if (value.trim().length < 2) {
        return 'Name must be at least 2 characters';
      }
      return true;
    }
  },
  phone: {
    required: true,
    minLength: 10,
    validate: (value: string) => {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length < 10) {
        return 'Please enter a valid phone number';
      }
      return true;
    }
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    validate: (value: string) => {
      if (value.trim().length < 10) {
        return 'Message must be at least 10 characters';
      }
      return true;
    }
  }
};

