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
  } ,  
  {
    path: "scheduledaudits",
    loadChildren: () =>
    import("./scheduledaudits/scheduledaudits.module").then((m) => m.ScheduledauditsModule),
  }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }
