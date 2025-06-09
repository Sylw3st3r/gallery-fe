import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [RouterOutlet, MatButton],
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  addGalleryItem() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
