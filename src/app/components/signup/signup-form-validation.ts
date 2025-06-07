import { Validators } from '@angular/forms';
import {
  FormConfig,
  ValidationMessages,
} from '../../types/form-validation.types';
import { SignUpFields } from './signup.enum';

export const signUpFormConfig: FormConfig<SignUpFields> = {
  [SignUpFields.FirstName]: [
    '',
    [Validators.required, Validators.minLength(2)],
  ],
  [SignUpFields.LastName]: ['', [Validators.required, Validators.minLength(2)]],
  [SignUpFields.Email]: ['', [Validators.required, Validators.email]],
  [SignUpFields.Password]: ['', [Validators.required, Validators.minLength(6)]],
  [SignUpFields.ConfirmPassword]: [
    '',
    [Validators.required, Validators.minLength(6)],
  ],
};

export const signUpValidationMessages: ValidationMessages<SignUpFields> = {
  [SignUpFields.FirstName]: {
    required: 'First name is required',
    minlength: 'First name must be at least 2 characters long',
  },
  [SignUpFields.LastName]: {
    required: 'Last name is required',
    minlength: 'Last name must be at least 2 characters long',
  },
  [SignUpFields.Email]: {
    required: 'Email is required',
    email: 'Email is not valid',
  },
  [SignUpFields.Password]: {
    required: 'Password is required',
    minlength: 'Password must be at least 6 characters long',
  },
  [SignUpFields.ConfirmPassword]: {
    required: 'Confirm password is required',
    minlength: 'Confirm password must be at least 6 characters long',
  },
};
