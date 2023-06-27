import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ListResult } from "../../repository/dtos/list-result";
import { Expense } from "../../domain/expense";
import { ExpenseRepository } from "../../repository/expense.repository";

@Injectable()
export class ExpenseListResolver implements Resolve<ListResult<Expense>> {
  constructor(
    @Inject('configuration') private readonly configuration: { pagination: { limit: number } },
    private readonly expenseRepository: ExpenseRepository
  ) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<ListResult<Expense>> {
    let page = 1;
    if(route.queryParamMap.has('page')){
      page = +route.queryParamMap.get(('page'));
    }
    return this.expenseRepository.listFor(
        page,
        this.configuration.pagination.limit
    );
  }
}
