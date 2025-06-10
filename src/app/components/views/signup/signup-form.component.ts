import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { WiredInputComponent } from '../../shared/wired-input/wired-input.component';
import { AuthService } from '../../../services/auth.service';
import {
  RxReactiveFormsModule,
  RxFormBuilder,
} from '@rxweb/reactive-form-validators';
import {
  SignUpPayload,
  SignUpPayloadFields,
} from '../../../models/signup-payload.model';

type SignUpForm = FormGroup<{
  [key in SignUpPayloadFields]: FormControl<string>;
}>;

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  imports: [
    RxReactiveFormsModule,
    ReactiveFormsModule,
    WiredInputComponent,
    MatButtonModule,
    MatCardModule,
  ],
})
export class SignupFormComponent {
  signupForm: SignUpForm;

  constructor(
    private readonly formBuilder: RxFormBuilder,
    private readonly _authService: AuthService,
  ) {
    const signUpPayload = new SignUpPayload();
    this.signupForm = this.formBuilder.formGroup(signUpPayload) as SignUpForm;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this._authService.signUp(this.signupForm.getRawValue());
    } else {
      this.signupForm.markAllAsTouched(); // show errors
    }
  }
}
