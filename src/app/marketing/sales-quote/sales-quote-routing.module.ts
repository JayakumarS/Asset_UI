import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSalesComponent } from 'src/app/marketing/sales-quote/add-sales/add-sales.component';
import { ListSalesQuoteComponent } from './list-sales-quote/list-sales-quote.component';
import { DeleteSalesComponent } from './list-sales-quote/delete-sales/delete-sales.component';
const routes: Routes = [
  {
    path: "addSales/:id",
    component: AddSalesComponent,
  },
  {
    path: "listSalesQuote",
    component: ListSalesQuoteComponent,
  },
  {
    path: "deleteSales",
    component: DeleteSalesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesQuoteRoutingModule { }
