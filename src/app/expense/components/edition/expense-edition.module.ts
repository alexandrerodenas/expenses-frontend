import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExpenseFromIdResolver} from "./expense-from-id.resolver";
import {ExpenseEditionContainerComponent} from "./expense-edition-container.component";
import { ExpenseEditionRoutingModule } from "./expense-edition.routing.module";
import { ExpenseEditionFormComponent } from "./form/expense-edition-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    ExpenseEditionContainerComponent,
    ExpenseEditionFormComponent
  ],
  imports: [
    CommonModule,
    ExpenseEditionRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers:[
    ExpenseFromIdResolver
  ],
  exports: [
    ExpenseEditionContainerComponent,
    ExpenseEditionFormComponent
  ]
})
export class ExpenseEditionModule { }
