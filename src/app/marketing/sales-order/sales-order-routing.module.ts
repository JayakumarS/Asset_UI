import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { DeleteOrderComponent } from './list-sales-order/delete-order/delete-order.component';
import { ListSalesOrderComponent } from './list-sales-order/list-sales-order.component';
const routes: Routes = [
  {
    path: "addOrder/:id",
    component: AddOrderComponent,
  },
  {
    path: "listSalesOrder",
    component: ListSalesOrderComponent,
  },
  {
    path: "deleteOrder",
    component: DeleteOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderRoutingModule { }
