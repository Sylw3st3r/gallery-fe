import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    NgClass,
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatTooltip,
    RouterLink,
  ],
})
export class MainLayoutComponent {
  isExpanded = true;

  expandedWidth = 240;
  collapsedWidth = 72;

  links = [
    { icon: 'dashboard', label: 'Dashboard', path: '#' },
    { icon: 'person', label: 'Profile', path: '#' },
    { icon: 'settings', label: 'Settings', path: '#' },
    { icon: 'logout', label: 'Logout', path: '#' },
  ];

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
