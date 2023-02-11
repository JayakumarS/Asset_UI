import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCurrencyComponent } from 'src/app/finance/master/currency/add-currency/add-currency.component';
const routes: Routes = [
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
