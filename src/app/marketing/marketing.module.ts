import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing-routing.module';
import { SalesQuoteModule } from './sales-quote/sales-quote.module';
import { SalesOrderModule } from './sales-order/sales-order.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    SalesQuoteModule,
    SalesOrderModule
  ]
})
export class MarketingModule { }
