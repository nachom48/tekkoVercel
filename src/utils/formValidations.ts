const VALIDATION_MESSAGES = {
    require: 'Este campo es requerido'
  };
  
  type ValidationMessage = {
    required?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
  };
  
  type ValidationRule = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message: ValidationMessage;
  };
  
  type ValidationRules<T> = {
    [K in keyof T]: ValidationRule;
  };
  
  interface FormValues {
    username?: string;
    password?: string;
    email?: string;
  }
  
  const VALIDATION_RULES: ValidationRules<FormValues> = {
    username: {
      required: true,
      message: {
        required: VALIDATION_MESSAGES.require,
        maxLength: 'Must be 15 characters or less'
      }
    },
    password: {
      required: true,
      maxLength: 20,
      message: {
        required: VALIDATION_MESSAGES.require,
        maxLength: 'Must be 20 characters or less'
      }
    },
    email: {
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: {
        required: VALIDATION_MESSAGES.require,
        pattern: 'Invalid email address'
      }
    }
  };
  
  export const validateInput = (values: FormValues, fieldsToValidate: string[]) => {
    const errors: Partial<Record<keyof FormValues, string>> = {};
  
    for (const field of fieldsToValidate) {
      const value = values[field as keyof FormValues];
      const rule = VALIDATION_RULES[field as keyof FormValues];
  
      if (rule?.required && (!value || value.trim() === "")) {
        errors[field as keyof FormValues] = rule.message.required!;
      } else if (rule?.maxLength && value!.length > rule.maxLength) {
        errors[field as keyof FormValues] = rule.message.maxLength!;
      } else if (rule?.pattern && !rule.pattern.test(value!)) {
        errors[field as keyof FormValues] = rule.message.pattern!;
      }
    }
  
    return errors;
  };
  