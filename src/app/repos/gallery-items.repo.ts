import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGalleryItemPayload } from '../models/create-gallery-item-payload.model';
import { IGalleryItemsPayload } from '../models/gallery-items.payload.interface';

@Injectable({
  providedIn: 'root',
})
export class GalleryItemsRepo {
  constructor(private http: HttpClient) {}

  public create(galleryItemPayload: CreateGalleryItemPayload) {
    const formData = new FormData();
    formData.append('name', galleryItemPayload.name);
    formData.append('description', galleryItemPayload.description);
    formData.append('image', galleryItemPayload.image);

    this.http
      .post('http://localhost:5062/api/gallery-items', formData)
      .subscribe({
        next: (response) => {
          console.log('Added successfully', response);
        },
        error: (error) => {
          console.error('Sign up failed', error);
        },
      });
  }

  public getAll(
    search: string,
    page: string,
    limit: string,
  ): Observable<IGalleryItemsPayload> {
    return this.http.get<IGalleryItemsPayload>(
      'http://localhost:5062/api/gallery-items',
      {
        params: {
          search,
          page,
          limit,
        },
      },
    );
  }
}
