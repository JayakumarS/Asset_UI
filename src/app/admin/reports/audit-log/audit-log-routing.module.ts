import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAuditLogComponent } from './list-audit-log/list-audit-log.component';
import { ViewAuditLogComponent } from './view-audit-log/view-audit-log.component';

const routes: Routes = [
  {
    path: "list-audit-log",
    component: ListAuditLogComponent,
  },
  {
    path: "view-audit-log/:id",
    component: ViewAuditLogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditLogRoutingModule { }
