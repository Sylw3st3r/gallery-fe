import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryControllsComponent } from './gallery-controlls/gallery-controlls.component';
import { GalleryItemsRepo } from '../../../repos/gallery-items.repo';
import { merge, Observable, Subject, switchMap } from 'rxjs';
import { IGalleryItemsPayload } from '../../../models/gallery-items.payload.interface';
import { CommonModule } from '@angular/common';
import { GalleryDataService } from '../../../services/gallery-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    RouterOutlet,
    GalleryControllsComponent,
    GalleryComponent,
    CommonModule,
  ],
})
export class DashboardComponent {
  public data$: Observable<IGalleryItemsPayload>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly galleryDataService: GalleryDataService,
  ) {
    this.data$ = this.galleryDataService.getGalleryData();
  }
}
