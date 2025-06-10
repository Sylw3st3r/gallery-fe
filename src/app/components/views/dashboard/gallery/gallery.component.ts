import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GalleryItemsRepo } from '../../../../repos/gallery-items.repo';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
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
  @Input({ required: true })
  public items!: IGalleryItem[];

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
