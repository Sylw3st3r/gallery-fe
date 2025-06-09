import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterLink,
  ],
})
export class MainLayoutComponent {
  isSidenavOpened = true;

  links = [
    { icon: 'dashboard', label: 'Dashboard', path: '#' },
    { icon: 'person', label: 'Profile', path: '#' },
    { icon: 'settings', label: 'Settings', path: '#' },
    { icon: 'logout', label: 'Logout', path: '#' },
  ];

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
