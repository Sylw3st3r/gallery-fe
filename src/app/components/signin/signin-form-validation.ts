import { Validators } from '@angular/forms';
import {
  FormConfig,
  ValidationMessages,
} from '../../types/form-validation.types';
import { SignInPayloadKeys } from '../../services/signin-payload.interface';

export const signInFormConfig: FormConfig<SignInPayloadKeys> = {
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
};

export const signInValidationMessages: ValidationMessages<SignInPayloadKeys> = {
  email: {
    required: 'Email is required',
    email: 'Email is not valid',
  },
  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 6 characters long',
  },
};
