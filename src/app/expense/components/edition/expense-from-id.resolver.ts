import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ExpenseRepository} from "../../repository/expense.repository";
import {Expense} from "../../domain/expense";

@Injectable()
export class ExpenseFromIdResolver implements Resolve<Expense> {
  constructor(private readonly expenseRepository: ExpenseRepository) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Expense> {
    const expenseId = route.paramMap.get('id');

    return this.expenseRepository.get(expenseId as unknown as number);
  }
}
