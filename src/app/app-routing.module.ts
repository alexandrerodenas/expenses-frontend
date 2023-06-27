import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseModule } from "./expense/expense.module";


const routes: Routes = [
  {
    path: '',
    loadChildren: () => ExpenseModule
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
