import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SignInFiedls } from './signin.enum';
import { WiredInputComponent } from '../wired-input/wired-input.component';
import {
  signInFormConfig,
  signInValidationMessages,
} from './signin-form-validation';
import { ValidationMessages } from '../../types/form-validation.types';

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
  // Using a constant for field names to avoid typos and ensure consistency
  // This helps maintain consistency across the application and makes it easier to refactor if needed.
  // It also improves code readability by providing a single source of truth for field names.
  // This is particularly useful in larger applications where field names might be used in multiple places.
  public readonly fileds: typeof SignInFiedls = SignInFiedls;

  public readonly allValidationMessages: ValidationMessages<SignInFiedls> =
    signInValidationMessages;

  public signinForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.signinForm = this.formBuilder.group(signInFormConfig);
  }

  onSubmit() {
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
    } else {
      this.signinForm.markAllAsTouched(); // show errors
    }
  }
}
