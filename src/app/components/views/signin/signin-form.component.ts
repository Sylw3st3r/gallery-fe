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
  SignInPayload,
  SignInPayloadFields,
} from '../../../models/signin-payload.model';

type SignInForm = FormGroup<{
  [key in SignInPayloadFields]: FormControl<string>;
}>;

@Component({
  selector: 'signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
  imports: [
    RxReactiveFormsModule,
    ReactiveFormsModule,
    WiredInputComponent,
    MatButtonModule,
    MatCardModule,
  ],
})
export class SigninFormComponent {
  public signinForm: SignInForm;

  constructor(
    private readonly formBuilder: RxFormBuilder,
    private readonly _authService: AuthService,
  ) {
    const signInPayload = new SignInPayload();
    this.signinForm = this.formBuilder.formGroup(signInPayload) as SignInForm;
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this._authService.signIn(this.signinForm.getRawValue());
    } else {
      this.signinForm.markAllAsTouched(); // show errors
    }
  }
}
