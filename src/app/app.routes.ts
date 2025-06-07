import { Routes } from '@angular/router';
import { SignupFormComponent } from './components/signup/signup-form.component';
import { SigninFormComponent } from './components/signin/signin-form.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'signin', component: SigninFormComponent },
];
