import { Validators } from '@angular/forms';
import {
  FormConfig,
  ValidationMessages,
} from '../../types/form-validation.types';
import { SignInFiedls } from './signin.enum';

export const signInFormConfig: FormConfig<SignInFiedls> = {
  [SignInFiedls.Email]: ['', [Validators.required, Validators.email]],
  [SignInFiedls.Password]: ['', [Validators.required, Validators.minLength(6)]],
};

export const signInValidationMessages: ValidationMessages<SignInFiedls> = {
  [SignInFiedls.Email]: {
    required: 'Email is required',
    email: 'Email is not valid',
  },
  [SignInFiedls.Password]: {
    required: 'Password is required',
    minlength: 'Password must be at least 6 characters long',
  },
};
