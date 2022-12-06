import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: "salesQuote",
    loadChildren: () =>
      import("./sales-quote/sales-quote-routing.module").then((m) => m.SalesQuoteRoutingModule),
  },
  {
    path: "salesOrder",
    loadChildren: () =>
      import("./sales-order/sales-order-routing.module").then((m) => m.SalesOrderRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
    MatIconModule]
})
export class MarketingRoutingModule { }
