import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListRoutingModule } from "./components/list/expense-list.routing.module";
import { ExpenseEditionModule } from "./components/edition/expense-edition.module";
import { ExpenseCreationModule } from "./components/creation/expense-creation.module";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/expenses',
    pathMatch: 'full'
  },
  {
    path: 'expenses',
    loadChildren: () => ExpenseListRoutingModule
  },
  {
    path: 'expenses/new',
    loadChildren: () => ExpenseCreationModule
  },
  {
    path: 'expenses/edit/:id',
    loadChildren: () => ExpenseEditionModule
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
