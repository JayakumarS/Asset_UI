import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRMRoutingModule } from './crm-routing.module';
import { SalesCallEntryModule } from './sales-call-entry/sales-call-entry.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    CRMRoutingModule,
    SalesCallEntryModule
  ]
})
export class CRMModule { }
