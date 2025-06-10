import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GalleryItemsRepo } from '../../../../repos/gallery-items.repo';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { map, Observable } from 'rxjs';
import { GalleryResolver } from '../../../../resolvers/gallery-items.resolver';
import { ActivatedRoute } from '@angular/router';
import { IGalleryItem } from '../../../../models/gallery-items.payload.interface';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
  ],
  providers: [GalleryItemsRepo],
})
export class GalleryComponent {
  items$: Observable<IGalleryItem[]>;

  constructor(private readonly route: ActivatedRoute) {
    this.items$ = this.route.data.pipe(
      map((data) => data[GalleryResolver.Key]),
      map((data) => data.items),
    );
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
