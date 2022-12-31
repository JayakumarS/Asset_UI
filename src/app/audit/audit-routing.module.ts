import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddManageAuditComponent } from './manage-audit/add-manage-audit/add-manage-audit.component';
import { ListManageAuditComponent } from './manage-audit/list-manage-audit/list-manage-audit.component';

const routes: Routes = [
  {
    path: "manageaudit",
    loadChildren: () =>
    import("./manage-audit/manage-audit.module").then((m) => m.ManageAuditModule),
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }
