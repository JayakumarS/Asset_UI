import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchaseInvoiceComponent } from './add-purchase-invoice/add-purchase-invoice.component';
import { ListPurchaseInvoiceComponent } from './list-purchase-invoice/list-purchase-invoice.component';
import { PurchaseInvoicePrintComponent } from './list-purchase-invoice/purchase-invoice-print/purchase-invoice-print.component';


const routes: Routes = [
  {
    path: "listPurchaseInvoice",
    component: ListPurchaseInvoiceComponent,
  },
  {
    path: "addPurchaseInvoice/:id",
    component: AddPurchaseInvoiceComponent,
  },
  {
    path: "printPurchaseInvoice",
    component: PurchaseInvoicePrintComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseInvoiceRoutingModule { }
