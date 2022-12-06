import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "bankReceipt",
    loadChildren: () =>
    import("./bank-receipt/bank-receipt.module").then((m) => m.BankReceiptModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
