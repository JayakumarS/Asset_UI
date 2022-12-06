import { ListBankReceiptComponent } from './list-bank-receipt/list-bank-receipt.component';
import { AddBankReceiptComponent } from './add-bank-receipt/add-bank-receipt.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addBankReceipt",
    component: AddBankReceiptComponent,
  },

  {
    path: "listBankReceipt",
    component: ListBankReceiptComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankReceiptRoutingModule { }
