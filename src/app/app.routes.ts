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
    loadComponent: () =>
      import('./components/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent,
      ),
    canActivateChild: [unauthorizedGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/welcome/welcome.component').then(
            (m) => m.WelcomeComponent,
          ),
      },
      {
        path: 'signin',
        loadComponent: () =>
          import('./components/signin/signin-form.component').then(
            (m) => m.SigninFormComponent,
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./components/signup/signup-form.component').then(
            (m) => m.SignupFormComponent,
          ),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
