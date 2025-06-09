import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryItemsRepo } from '../repos/gallery-items.repo';

@Injectable({
  providedIn: 'root',
})
export class GalleryResolver implements Resolve<any> {
  static Key: string = 'gallery-items-resolver';

  constructor(private readonly _galleryRepo: GalleryItemsRepo) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot,
  ): Observable<any> {
    const page = route.queryParamMap.get('page') ?? '1';
    const search = route.queryParamMap.get('search') ?? '';
    const limit = route.queryParamMap.get('limit') ?? '20';

    return this._galleryRepo.getAll(search, page, limit);
  }
}
