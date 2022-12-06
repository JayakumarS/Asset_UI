import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCurrencyMasterComponent } from './add-currency-master/add-currency-master.component';
import { ListCurrencyMasterComponent } from './list-currency-master/list-currency-master.component';

const routes: Routes = [
  {
    path: "addCurrency/:id",
    component: AddCurrencyMasterComponent,
  },
  {
     path: "listCurrency",
     component: ListCurrencyMasterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyMasterRoutingModule { }
