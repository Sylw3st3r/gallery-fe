import { Validators } from '@angular/forms';
import {
  FormConfig,
  ValidationMessages,
} from '../../types/form-validation.types';
import { SignUpPayloadKeys } from '../../services/signup-payload.interface';

export const signUpFormConfig: FormConfig<SignUpPayloadKeys> = {
  firstName: ['', [Validators.required, Validators.minLength(2)]],
  lastName: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
};

export const signUpValidationMessages: ValidationMessages<SignUpPayloadKeys> = {
  firstName: {
    required: 'First name is required',
    minlength: 'First name must be at least 2 characters long',
  },
  lastName: {
    required: 'Last name is required',
    minlength: 'Last name must be at least 2 characters long',
  },
  email: {
    required: 'Email is required',
    email: 'Email is not valid',
  },
  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 6 characters long',
  },
  confirmPassword: {
    required: 'Confirm password is required',
    minlength: 'Confirm password must be at least 6 characters long',
  },
};
