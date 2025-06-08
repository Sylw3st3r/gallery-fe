import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { WiredInputComponent } from '../wired-input/wired-input.component';
import { SignIn, SignInFields } from '../../services/signin.model';
import { AuthService } from '../../services/auth.service';
import {
  RxReactiveFormsModule,
  RxFormBuilder,
} from '@rxweb/reactive-form-validators';

type SignInForm = FormGroup<{
  [key in SignInFields]: FormControl<string>;
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
    const signIn = new SignIn();
    this.signinForm = this.formBuilder.formGroup(signIn) as SignInForm;
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this._authService.signIn(this.signinForm.getRawValue());
    } else {
      this.signinForm.markAllAsTouched(); // show errors
    }
  }
}
