import { Routes } from '@angular/router';
import { SignupFormComponent } from './components/signup/signup-form.component';
import { SigninFormComponent } from './components/signin/signin-form.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { unauthorizedGuard } from './guards/unauthorized.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivateChild: [unauthorizedGuard],
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'signin', component: SigninFormComponent },
      { path: 'signup', component: SignupFormComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [authGuard],
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
