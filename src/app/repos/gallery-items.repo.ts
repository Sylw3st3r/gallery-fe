import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GalleryItem } from '../services/gallery-item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryItemsRepo {
  constructor(private http: HttpClient) {}

  public create(galleryItemPayload: GalleryItem) {
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
  ): Observable<unknown> {
    return this.http.get('http://localhost:5062/api/gallery-items', {
      params: {
        search,
        page,
        limit,
      },
    });
  }
}
