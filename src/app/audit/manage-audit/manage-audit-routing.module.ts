import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddManageAuditComponent } from './add-manage-audit/add-manage-audit.component';
import { ListManageAuditComponent } from './list-manage-audit/list-manage-audit.component';

const routes: Routes = [
  {
    path:"addManageAudit/:id",
    component:AddManageAuditComponent
  },
  {
    path:"listManageAudit",
    component:ListManageAuditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAuditRoutingModule { }
