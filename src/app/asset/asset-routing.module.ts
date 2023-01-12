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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
