import { ListPurchaseComponent } from './../../../purchase/purchase-request/list-purchase/list-purchase.component';
import { AddPurchaseComponent } from './../../../purchase/purchase-request/add-purchase/add-purchase.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addPurchaseInvoice",
    component: AddPurchaseComponent,
  },
  {
    path: "listPurchaseInvoice",
    component: ListPurchaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseInvoiceRoutingModule { }
