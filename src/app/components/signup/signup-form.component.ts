import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { WiredInputComponent } from '../wired-input/wired-input.component';
import {
  signUpFormConfig,
  signUpValidationMessages,
} from './signup-form-validation';
import { ValidationMessages } from '../../types/form-validation.types';
import { SignUpPayloadKeys } from '../../services/signup-payload.interface';
import { AuthService } from '../../services/auth.service';

type SignUpForm = FormGroup<{
  [key in SignUpPayloadKeys]: FormControl<string>;
}>;

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
  public readonly allSignUpValidationMessages: ValidationMessages<SignUpPayloadKeys> =
    signUpValidationMessages;

  signupForm: SignUpForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _authService: AuthService,
  ) {
    this.signupForm = this.formBuilder.group(signUpFormConfig) as SignUpForm;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this._authService.signUp(this.signupForm.getRawValue());
    } else {
      this.signupForm.markAllAsTouched(); // show errors
    }
  }
}
