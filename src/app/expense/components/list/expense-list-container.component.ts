import {Component} from '@angular/core';
import { Expense, ExpenseId } from "../../domain/expense";
import {ExpenseRepository} from "../../repository/expense.repository";
import { map, take } from "rxjs";
import {Pagination} from "./pagination/pagination.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-expense-list-container',
  templateUrl: './expense-list-container.component.html'
})
export class ExpenseListContainerComponent {
  public expenses: ReadonlyArray<Expense>;
  public count: number;

  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute
      .data
      .pipe(
        map(data => {
          if (!data.hasOwnProperty('listResult')) {
            throw new Error('No list result found.');
          }
          return data['listResult'];
        }),
        take(1)
      )
      .subscribe(listResult => {
        this.expenses= listResult.items;
        this.count = listResult.count;
      });
  }

  public changePagination(pagination: Pagination): void {
    this.expenseRepository
      .listFor(pagination.page, pagination.limit)
      .pipe(take(1))
      .subscribe(listResult => {
        this.expenses= listResult.items;
        this.count = listResult.count;
        this.router.navigate([], {
          queryParams: {page: pagination.page},
          relativeTo: this.activatedRoute
        });
      });
  }

  public navigateToEditionFor(expenseId: ExpenseId): void {
    this.router.navigateByUrl(`/expenses/edit/${expenseId}`);
  }

  public navigateToCreationPage(): void {
    this.router.navigateByUrl(`/expenses/new`);
  }
}
