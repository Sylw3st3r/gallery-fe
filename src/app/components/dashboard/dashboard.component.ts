import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [MatButton],
})
export class DashboardComponent {
  constructor(private readonly _authService: AuthService) {}

  public signOut() {
    this._authService.signOut();
  }
}
