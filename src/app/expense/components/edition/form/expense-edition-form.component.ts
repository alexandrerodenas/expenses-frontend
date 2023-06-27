import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Expense, RestaurantExpense, TripExpense } from "../../../domain/expense";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faCoins, faMap, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { apply_yyyy_MM_dd } from "../../../../utils/date-formatter";
import { EditionForm } from "./model/edition-form";

@Component({
  selector: 'app-expense-edition-form',
  templateUrl: './expense-edition-form.component.html',
  styleUrls: ['./expense-edition-form.component.scss']
})
export class ExpenseEditionFormComponent implements OnInit {

  @Input() expenseToEdit: Expense;
  public readonly faCoins = faCoins;
  public readonly faMap = faMap;
  public readonly faPeopleGroup = faPeopleGroup;
  public editionForm: FormGroup;
  @Output() onFormSubmission = new EventEmitter<EditionForm>();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editionForm = this.formBuilder.group({
      id: [this.expenseToEdit.getId(), [Validators.required]],
      amount: [this.expenseToEdit.getAmount(), [Validators.required, Validators.min(1)]],
      type: [this.expenseToEdit.getType(), [Validators.required]],
      creationDate: [
        apply_yyyy_MM_dd(this.expenseToEdit.getCreationDate()),
        [Validators.required]
      ],
      commentary: [this.expenseToEdit.getCommentary(), [Validators.required]],
      guests: [
        this.getNumberOfGuestsOrZero(),
        [Validators.required, Validators.min(0)]
      ],
      distance: [
        this.getDistanceOrZero(),
        [Validators.required, Validators.min(0)]
      ]
    });
  }

  private getNumberOfGuestsOrZero(): number {
    if(this.expenseToEdit.getType() === "restaurant"){
      return (this.expenseToEdit as RestaurantExpense).getNumberOfGuests();
    }
    return 0;
  }

  private getDistanceOrZero(): number {
    if(this.expenseToEdit.getType() === "trip"){
      return (this.expenseToEdit as TripExpense).getDistance();
    }
    return 0;
  }

  public submitForm(): void {
    this.onFormSubmission.emit(this.editionForm.getRawValue());
  }
}
