import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryItemsRepo } from '../repos/gallery-items.repo';
import { IGalleryItemsPayload } from '../models/gallery-items.payload.interface';

@Injectable({
  providedIn: 'root',
})
export class GalleryResolver implements Resolve<any> {
  static Key: string = 'gallery-items-resolver';

  constructor(private readonly _galleryRepo: GalleryItemsRepo) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot,
  ): Observable<IGalleryItemsPayload> {
    const page = route.queryParamMap.get('page') ?? '1';
    const search = route.queryParamMap.get('search') ?? '';
    const limit = route.queryParamMap.get('limit') ?? '20';

    return this._galleryRepo.getAll(search, page, limit);
  }
}
