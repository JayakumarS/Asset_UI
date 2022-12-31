import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAuditRoutingModule } from './manage-audit-routing.module';
import { AddManageAuditComponent } from './add-manage-audit/add-manage-audit.component';
import { ListManageAuditComponent } from './list-manage-audit/list-manage-audit.component';


@NgModule({
  declarations: [
    AddManageAuditComponent,
    ListManageAuditComponent
  ],
  imports: [
    CommonModule,
    ManageAuditRoutingModule
  ]
})
export class ManageAuditModule { }
