import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpenseRepository} from "./repository/expense.repository";
import {ExpenseListContainerComponent} from './components/list/expense-list-container.component';
import {ExpenseListComponent} from './components/list/expense-list.component';
import {configuration} from "../config";
import {HttpClientModule} from "@angular/common/http";
import {ExpenseListModule} from "./components/list/expense-list.module";
import {ExpenseEditionModule} from "./components/edition/expense-edition.module";
import { ExpenseRoutingModule } from "./expense.routing.module";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ExpenseListModule,
    ExpenseEditionModule,
    ExpenseRoutingModule
  ],
  providers: [
    ExpenseRepository,
    {provide: 'configuration', useValue: configuration},
  ]
})
export class ExpenseModule { }
