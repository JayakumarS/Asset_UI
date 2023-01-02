import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
