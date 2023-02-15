import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSalesInvoiceComponent } from './add-sales-invoice/add-sales-invoice.component';
import { ListSalesInvoiceComponent } from './list-sales-invoice/list-sales-invoice.component';

const routes: Routes = [
  {
    path: "add-sales-invoice/:id",
    component: AddSalesInvoiceComponent,
  },
  {
    path: "list-sales-invoice",
    component: ListSalesInvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesInvoiceRoutingModule { }
