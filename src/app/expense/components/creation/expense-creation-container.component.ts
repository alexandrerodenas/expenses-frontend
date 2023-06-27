import { Component } from '@angular/core';
import { CreationForm } from "./form/model/creation-form";
import { ExpenseRepository } from "../../repository/expense.repository";
import { Observable, take, tap } from "rxjs";
import {
  ExpenseToCreate,
  RestaurantExpenseToCreate,
  TripExpenseToCreate
} from "../../repository/dtos/expense-to-create";
import { Router } from "@angular/router";

@Component({
  selector: 'app-expense-creation-container',
  templateUrl: './expense-creation-container.component.html'
})
export class ExpenseCreationContainerComponent {

  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly router: Router
  ) {
  }

  public createExpenseFrom(creationForm: CreationForm): void {
    let expenseToCreate: ExpenseToCreate;
    if(creationForm.type === "trip"){
      expenseToCreate = new TripExpenseToCreate(
        creationForm.amount,
        new Date(creationForm.creationDate),
        creationForm.commentary,
        creationForm.distance
      );
    } else {
      expenseToCreate = new RestaurantExpenseToCreate(
        creationForm.amount,
        new Date(creationForm.creationDate),
        creationForm.commentary,
        creationForm.guests
      )
    }
    this.expenseRepository
      .create(expenseToCreate)
      .pipe(
        tap(() => this.router.navigateByUrl('/expenses'))
      ).subscribe();
  }
}
