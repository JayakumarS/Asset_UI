import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditReportsRoutingModule } from './audit-reports-routing.module';
import { ListAuditReportsComponent } from './list-audit-reports/list-audit-reports.component';


@NgModule({
  declarations: [
    ListAuditReportsComponent
  ],
  imports: [
    CommonModule,
    AuditReportsRoutingModule
  ]
})
export class AuditReportsModule { }
