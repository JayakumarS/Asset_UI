import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "assetMaster",
    loadChildren: () =>
      import("./asset-master/asset-master.module").then((m) => m.AssetMasterModule),
  },
  {
    path: "assetType",
    loadChildren: () =>
      import("./asset-type/asset-type.module").then((m)=>m.AssetTypeModule)
  },
  {
    path: "assetRequisition",
    loadChildren: () =>
      import("./asset-requisition/asset-requisition.module").then((m)=>m.AssetRequisitionModule)
  },
  {
    path: "assetReplacement",
    loadChildren: () =>
      import("./asset-replacement/asset-replacement.module").then((m)=>m.AssetReplacementModule)
  },
  {
    path: "assetTransfer",
    loadChildren: () =>
      import("./transfer-asset/transfer-asset.module").then((m)=>m.TransferAssetModule)
  },
  {
    path: "assetDiscard",
    loadChildren: () =>
      import("./discard-asset/discard-asset.module").then((m)=>m.DiscardAssetModule)
  },
  {
    path: "auditReport",
    loadChildren: () =>
      import("./audit-report/audit-report.module").then((m)=>m.AuditReportModule)
  },
  {
    path: "maintenanceAndReport",
    loadChildren: () =>
      import("./maintenance-and-repair/maintenance-and-repair.module").then((m)=>m.MaintenanceAndRepairModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
