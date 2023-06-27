import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ExpenseFromIdResolver} from "./expense-from-id.resolver";
import {ExpenseEditionContainerComponent} from "./expense-edition-container.component";

const routes: Routes = [
  {
    path: '',
    component: ExpenseEditionContainerComponent,
    resolve: {
      expenseToEdit: ExpenseFromIdResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseEditionRoutingModule {
}
