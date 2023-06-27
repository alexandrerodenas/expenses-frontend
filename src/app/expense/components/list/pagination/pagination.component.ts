import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

export interface Pagination {
  page: number;
  limit: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  @Input() count: number = 0;
  @Output() onPaginationChange = new EventEmitter<Pagination>();

  public pagination: Pagination = {
    page: 1,
    limit: this.configuration.pagination.limit
  }

  constructor(
    @Inject('configuration') private readonly configuration: { pagination: { limit: number } },
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute
      .queryParamMap
      .subscribe(
        queryParams => {
          if(queryParams.has('page')){
            this.pagination.page = +queryParams.get('page');
          }
        }
      );
  }

  public getPageIndexes(): ReadonlyArray<number> {
    const numberOfPages = Math.ceil(this.count / this.configuration.pagination.limit);
    return Array(numberOfPages).fill(1).map((x, i) => i + 1);
  }

  public changeToPage(pageNumber: number) : void {
    this.pagination.page = pageNumber;
    this.onPaginationChange.emit(this.pagination);
  }

  public cannotNavigateToNextPage(): boolean {
    const numberOfPages = Math.ceil(this.count / this.configuration.pagination.limit);
    return this.pagination.page === numberOfPages;
  }

  public cannotNavigateToPreviousPage(): boolean {
    return this.pagination.page === 1;
  }

  public goToPreviousPage(): void {
    this.pagination.page -= 1;
    this.onPaginationChange.emit(this.pagination);
  }

  public goToNextPage(): void {
    this.pagination.page += 1;
    this.onPaginationChange.emit(this.pagination);
  }
}
