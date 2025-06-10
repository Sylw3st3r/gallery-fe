import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { LoadingService } from '../../../services/loading.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    MatButtonModule,
    MatToolbar,
    RouterLink,
    RouterOutlet,
    MatProgressBar,
    CommonModule,
  ],
})
export class MainLayoutComponent {
  public loading$: Observable<boolean>;

  public links = [
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'person', label: 'Profile', path: '/profile' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];

  constructor(
    private readonly _authService: AuthService,
    private readonly loadingService: LoadingService,
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  public signOut() {
    this._authService.signOut();
  }
}
