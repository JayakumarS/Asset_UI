import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSalesOrderComponent } from './add-sales-order/add-sales-order.component';
import { ListSalesOrderComponent } from './list-sales-order/list-sales-order.component';

const routes: Routes = [
  {
    path: "list-sales-order",
    component: ListSalesOrderComponent,
  },
  {
    path: "add-sales-order/:id",
    component: AddSalesOrderComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderRoutingModule { }
