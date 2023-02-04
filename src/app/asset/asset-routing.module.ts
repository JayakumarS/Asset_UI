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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
