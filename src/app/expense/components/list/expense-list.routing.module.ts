import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ExpenseListContainerComponent} from "./expense-list-container.component";
import { ExpenseEditionModule } from "../edition/expense-edition.module";
import { ExpenseListResolver } from "./expense-list.resolver";

const routes: Routes = [
  {
    path: '',
    component: ExpenseListContainerComponent,
    resolve: {
      listResult: ExpenseListResolver
    }
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
export class ExpenseListRoutingModule {
}
