import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchaseOrderComponent } from './add-purchase-order/add-purchase-order.component';
import { ListPurchaseOrderComponent } from './list-purchase-order/list-purchase-order.component';
import { PurchaseOrderPrintComponent } from './list-purchase-order/purchase-order-print/purchase-order-print.component';

const routes: Routes = [
  {
    path: "listPurchaseOrder",
    component: ListPurchaseOrderComponent,
  },
  {
    path: "addPurchaseOrder/:id",
    component: AddPurchaseOrderComponent,
  },
  {
    path: "printPurchaseOrder",
    component: PurchaseOrderPrintComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
