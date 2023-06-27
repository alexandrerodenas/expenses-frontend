import { Component, OnInit } from '@angular/core';
import { Expense, TripExpense } from "../../domain/expense";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";
import { EditionForm } from "./form/model/edition-form";
import { ExpenseRepository } from "../../repository/expense.repository";
import {
  ExpenseToUpdate,
  RestaurantExpenseToUpdate,
  TripExpenseToUpdate
} from "../../repository/dtos/expense-to-update";

@Component({
  selector: 'app-expense-edition-container',
  templateUrl: './expense-edition-container.component.html'
})
export class ExpenseEditionContainerComponent implements OnInit {
  public expenseToEdit: Observable<Expense>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly expenseRepository: ExpenseRepository,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.expenseToEdit = this.activatedRoute
      .data
      .pipe(
        map(data => {
          if (!data.hasOwnProperty('expenseToEdit')) {
            throw new Error('No expense to edit found.');
          }
          return data['expenseToEdit'];
        })
      );
  }

  public editExpenseFrom(editionForm: EditionForm): Observable<Expense> {
    let expenseToUpdate: ExpenseToUpdate;
    if (editionForm.type === "restaurant") {
      expenseToUpdate = new RestaurantExpenseToUpdate(
        editionForm.id,
        editionForm.amount,
        new Date(editionForm.creationDate),
        editionForm.commentary,
        editionForm.guests
      );
    } else {
      expenseToUpdate = new TripExpenseToUpdate(
        editionForm.id,
        editionForm.amount,
        new Date(editionForm.creationDate),
        editionForm.commentary,
        editionForm.distance
      );
    }
    return this.expenseRepository
      .update(expenseToUpdate)
      .pipe(
        take(1),
        tap(() => this.router.navigateByUrl("/expenses"))
      );
  }
}
