import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"purchaseInvoice",
    loadChildren: () =>
    import("./purchase-invoice/purchase-invoice.module").then((m) => m.PurchaseInvoiceModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
