import { Routes } from '@angular/router';
import { unauthorizedGuard } from './guards/unauthorized.guard';
import { authGuard } from './guards/auth.guard';
import { GalleryResolver } from './resolvers/gallery-items.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent,
      ),
    canActivateChild: [unauthorizedGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/views/welcome/welcome.component').then(
            (m) => m.WelcomeComponent,
          ),
      },
      {
        path: 'signin',
        loadComponent: () =>
          import('./components/views/signin/signin-form.component').then(
            (m) => m.SigninFormComponent,
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./components/views/signup/signup-form.component').then(
            (m) => m.SignupFormComponent,
          ),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        resolve: {
          [GalleryResolver.Key]: GalleryResolver,
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        loadComponent: () =>
          import('./components/views/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
        children: [
          {
            path: 'add',
            // Added this property to prevent parent resolvers from running
            runGuardsAndResolvers: 'pathParamsChange',
            loadComponent: () =>
              import(
                './components/modals/gallery-item-form/gallery-item-form.component'
              ).then((m) => m.GalleryItemFormComponent),
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
