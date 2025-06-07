import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SignUpFields } from './signup.enum';
import { WiredInputComponent } from '../wired-input/wired-input.component';
import {
  signUpFormConfig,
  signUpValidationMessages,
} from './signup-form-validation';
import { ValidationMessages } from '../../types/form-validation.types';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  imports: [
    ReactiveFormsModule,
    WiredInputComponent,
    MatButtonModule,
    MatCardModule,
  ],
})
export class SignupFormComponent {
  // Using a constant for field names to avoid typos and ensure consistency
  // This helps maintain consistency across the application and makes it easier to refactor if needed.
  // It also improves code readability by providing a single source of truth for field names.
  public readonly fields: typeof SignUpFields = SignUpFields;

  public readonly allSignUpValidationMessages: ValidationMessages<SignUpFields> =
    signUpValidationMessages;

  signupForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group(signUpFormConfig);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched(); // show errors
    }
  }
}
