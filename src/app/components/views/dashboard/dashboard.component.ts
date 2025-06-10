import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryControllsComponent } from './gallery-controlls/gallery-controlls.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterOutlet, GalleryControllsComponent, GalleryComponent],
})
export class DashboardComponent {}
