import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchaseOrderComponent } from './add-purchase-order/add-purchase-order.component';
import { ListPurchaseOrderComponent } from './list-purchase-order/list-purchase-order.component';

const routes: Routes = [
  {
    path: "listAssetMaster",
    component: ListPurchaseOrderComponent,
  },
  {
    path: "addAssetMaster/:id",
    component: AddPurchaseOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
