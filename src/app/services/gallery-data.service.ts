import { Injectable } from '@angular/core';
import { merge, Observable, Subject, switchMap } from 'rxjs';
import { IGalleryItemsPayload } from '../models/gallery-items.payload.interface';
import { GalleryItemsRepo } from '../repos/gallery-items.repo';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GalleryDataService {
  private retrigger$: Subject<void> = new Subject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly galleryItemsRepo: GalleryItemsRepo,
  ) {}

  public getGalleryData(): Observable<IGalleryItemsPayload> {
    return merge(this.route.queryParamMap, this.retrigger$).pipe(
      switchMap(() => {
        const params = this.route.snapshot.paramMap;
        const search = params.get('search') || '';
        const page = +(params.get('page') || 1);
        const limit = +(params.get('limit') || 10);
        return this.galleryItemsRepo.getAll(search, page, limit);
      }),
    );
  }

  public retrigger() {
    this.retrigger$.next();
  }
}
