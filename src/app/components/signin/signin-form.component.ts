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
  signInFormConfig,
  signInValidationMessages,
} from './signin-form-validation';
import { ValidationMessages } from '../../types/form-validation.types';
import { SignInPayloadKeys } from '../../services/signin-payload.interface';
import { AuthService } from '../../services/auth.service';

type SignInForm = FormGroup<{
  [key in SignInPayloadKeys]: FormControl<string>;
}>;

@Component({
  selector: 'signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    WiredInputComponent,
    MatButtonModule,
    MatCardModule,
  ],
})
export class SigninFormComponent {
  public readonly allValidationMessages: ValidationMessages<SignInPayloadKeys> =
    signInValidationMessages;

  public signinForm: SignInForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _authService: AuthService,
  ) {
    this.signinForm = this.formBuilder.group(signInFormConfig) as SignInForm;
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this._authService.signIn(this.signinForm.getRawValue());
    } else {
      this.signinForm.markAllAsTouched(); // show errors
    }
  }
}
