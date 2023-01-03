import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchaseInvoiceComponent } from './add-purchase-invoice/add-purchase-invoice.component';
import { ListPurchaseInvoiceComponent } from './list-purchase-invoice/list-purchase-invoice.component';


const routes: Routes = [
  {
    path: "listPurchaseInvoice",
    component: ListPurchaseInvoiceComponent,
  },
  {
    path: "addPurchaseInvoice/:id",
    component: AddPurchaseInvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseInvoiceRoutingModule { }
