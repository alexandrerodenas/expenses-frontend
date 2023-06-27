import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseCreationContainerComponent } from "./expense-creation-container.component";
import { ExpenseCreationFormComponent } from "./form/expense-creation-form.component";
import { ExpenseCreationRoutingModule } from "./expense-creation.routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    ExpenseCreationContainerComponent,
    ExpenseCreationFormComponent
  ],
  imports: [
    CommonModule,
    ExpenseCreationRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    ExpenseCreationContainerComponent
  ]
})
export class ExpenseCreationModule { }
