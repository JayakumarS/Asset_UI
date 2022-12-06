import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListAccountingYearComponent } from 'src/app/finance/control-screen/accounting-year-close/list-accounting-year-close/list-accounting-year-close.component';
import { AddAccountingYearComponent } from 'src/app/finance/control-screen/accounting-year-close/add-accounting-year-close/add-accounting-year-close.component';
const routes: Routes = [
  {
    path: "listAccountingYear",
    component: ListAccountingYearComponent,
  },
  {
    path: "addAccountingYear",
    component: AddAccountingYearComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingYearRoutingModule { }
