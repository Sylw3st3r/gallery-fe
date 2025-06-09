import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { GalleryItemsRepo } from '../../repos/gallery-items.repo';
import { FormsModule } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { map, Observable } from 'rxjs';
import { GalleryResolver } from '../../resolvers/gallery-items.resolver';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
  ],
  providers: [GalleryItemsRepo, RxFormBuilder],
})
export class DashboardComponent implements OnInit {
  data$: Observable<any>;

  pageOptions$: Observable<number[]>;

  items$: Observable<any[]>;

  search: string = '';
  page: number = 1;
  limit: number = 10;

  pageOptions = [1, 2, 3, 4, 5];
  limitOptions = [5, 10, 20, 50];

  private searchDebounceTimeout?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.data$ = this.route.data.pipe(map((data) => data[GalleryResolver.Key]));

    this.pageOptions$ = this.data$.pipe(
      map((data) => {
        const totalPages = data?.totalPages ?? 1;
        // Array [1, 2, ..., totalPages]
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }),
    );

    this.items$ = this.data$.pipe(map((data) => data.items));
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.search = params.get('search') || '';
      this.page = +(params.get('page') || 1);
      this.limit = +(params.get('limit') || 10);
    });
  }

  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.search,
        page: this.page,
        limit: this.limit,
      },
      queryParamsHandling: 'merge',
    });
  }

  onLimitChanges() {
    this.page = 1;
    this.updateQueryParams();
  }

  onSearchChanged(search: string) {
    clearTimeout(this.searchDebounceTimeout);
    this.searchDebounceTimeout = setTimeout(() => {
      this.search = search;
      this.page = 1;
      this.updateQueryParams();
    }, 300);
  }

  addGalleryItem() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
