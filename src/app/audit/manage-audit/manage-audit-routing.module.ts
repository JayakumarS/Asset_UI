import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledViewComponent } from '../scheduledaudits/scheduled-view/scheduled-view.component';
import { AddManageAuditComponent } from './add-manage-audit/add-manage-audit.component';
import { DeleteManageAuditComponent } from './list-manage-audit/delete-manage-audit/delete-manage-audit.component';
import { ListManageAuditComponent } from './list-manage-audit/list-manage-audit.component';

const routes: Routes = [
  {
    path:"addManageAudit/:id",
    component:AddManageAuditComponent
  },
  {
    path:"listManageAudit",
    component:ListManageAuditComponent
  },
  {
    path: "manageAudit-view/:id",
    component: ScheduledViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAuditRoutingModule { }
