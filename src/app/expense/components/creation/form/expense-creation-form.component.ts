import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreationForm } from "./model/creation-form";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faCoins, faMap, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { apply_yyyy_MM_dd } from "../../../../utils/date-formatter";

@Component({
  selector: 'app-expense-creation-form',
  templateUrl: './expense-creation-form.component.html',
  styleUrls: ['./expense-creation-form.component.scss']
})
export class ExpenseCreationFormComponent implements OnInit {

  public readonly faCoins = faCoins;
  public readonly faMap = faMap;
  public readonly faPeopleGroup = faPeopleGroup;
  public creationForm: FormGroup;
  @Output() onFormSubmission = new EventEmitter<CreationForm>();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.creationForm = this.formBuilder.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      type: [undefined, [Validators.required]],
      creationDate: [
        apply_yyyy_MM_dd(new Date()),
        [Validators.required]
      ],
      commentary: ["Here comes your comment", [Validators.required]],
      guests: [
        0,
        [Validators.required, Validators.min(0)]
      ],
      distance: [
        0,
        [Validators.required, Validators.min(0)]
      ]
    });
  }

  public submitForm(): void {
    this.onFormSubmission.emit(this.creationForm.getRawValue());
  }
}
