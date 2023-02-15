import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBankRecieptsComponent } from './add-bank-reciepts/add-bank-reciepts.component';
import { ListBankRecieptsComponent } from './list-bank-reciepts/list-bank-reciepts.component';

const routes: Routes = [

  {
    path: "list-BankReciept",
    component: ListBankRecieptsComponent
  },
  {
    path: "add-BankReciept/:id",
    component: AddBankRecieptsComponent

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRecieptsRoutingModule { }
