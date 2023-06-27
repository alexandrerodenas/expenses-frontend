import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ExpenseCreationContainerComponent } from "./expense-creation-container.component";


const routes: Routes = [
  {
    path: '',
    component: ExpenseCreationContainerComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseCreationRoutingModule { }
