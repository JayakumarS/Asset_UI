import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPageComponent } from './list-page/list-page.component';
import { IncomeComponent } from './income/income.component';
import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [

  {
    path : "list",
    component : ListPageComponent,
  },
  {
    path :"income",
    component : IncomeComponent,
  },

  {
    path :"expensesnote",
    component : ExpensesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesNoteRoutingModule { }
