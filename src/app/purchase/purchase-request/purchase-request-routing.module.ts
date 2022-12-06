import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { DeletePurchaseComponent } from './list-purchase/delete-purchase/delete-purchase.component';
import { ListPurchaseComponent } from './list-purchase/list-purchase.component'

const routes: Routes = [
  {
    path: "listPurchase",
    component: ListPurchaseComponent,
  },
  {
    path: "addPurchase/:id",
    component: AddPurchaseComponent,
  },
  {
    path: "deletePurchase",
    component: DeletePurchaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestRoutingModule { }


