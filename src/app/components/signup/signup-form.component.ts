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
import { AuthService } from '../../services/auth.service';
import { SignUp, SignUpFields } from '../../services/signup.interface';
import {
  RxReactiveFormsModule,
  RxFormBuilder,
} from '@rxweb/reactive-form-validators';

type SignUpForm = FormGroup<{
  [key in SignUpFields]: FormControl<string>;
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
    const signUp = new SignUp();
    this.signupForm = this.formBuilder.formGroup(signUp) as SignUpForm;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this._authService.signUp(this.signupForm.getRawValue());
    } else {
      this.signupForm.markAllAsTouched(); // show errors
    }
  }
}
