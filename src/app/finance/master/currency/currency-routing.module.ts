import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCurrencyComponent } from 'src/app/finance/master/currency/list-currency/list-currency.component';
import { AddCurrencyComponent } from 'src/app/finance/master/currency/add-currency/add-currency.component';
const routes: Routes = [
  {
    path: "listCurrencyComponent",
    component: ListCurrencyComponent,
  },
  {
    path: "addCurrencyComponent",
    component: AddCurrencyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
