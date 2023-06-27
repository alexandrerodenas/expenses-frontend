import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ExpenseListContainerComponent} from "./expense-list-container.component";
import {ExpenseListComponent} from "./expense-list.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {CreateExpenseButtonComponent} from "./create-expense-button/create-expense-button.component";
import { ExpenseListRoutingModule } from "./expense-list.routing.module";
import { ExpenseListResolver } from "./expense-list.resolver";



@NgModule({
  declarations: [
    ExpenseListContainerComponent,
    ExpenseListComponent,
    PaginationComponent,
    CreateExpenseButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ExpenseListRoutingModule
  ],
  providers: [
    ExpenseListResolver
  ],
  exports: [
    ExpenseListContainerComponent
  ],
})
export class ExpenseListModule { }
