import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { GalleryItemsRepo } from '../../../../repos/gallery-items.repo';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-gallery-controlls',
  templateUrl: './gallery-controlls.component.html',
  styleUrls: ['./gallery-controlls.component.scss'],
  imports: [FormsModule, CommonModule],
  providers: [GalleryItemsRepo, RxFormBuilder],
})
export class GalleryControllsComponent implements OnInit {
  @Input({ required: true })
  public totalPages!: number;

  public disabled$: Observable<boolean>;

  search: string = '';
  page: number = 1;
  limit: number = 10;

  limitOptions = [5, 10, 20, 50];

  private searchDebounceTimeout?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
  ) {
    this.disabled$ = this.loadingService.loading$;
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
    this.router.navigate(['add'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  get pageOptions(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
