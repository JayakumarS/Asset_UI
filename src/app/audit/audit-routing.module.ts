import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "manageaudit",
    loadChildren: () =>
    import("./manage-audit/manage-audit.module").then((m) => m.ManageAuditModule),
  },
  {
    path: "auditableAsset",
    loadChildren: () =>
    import("./auditable-asset/auditable-asset.module").then((m) => m.AuditableAssetModule),
  }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }
