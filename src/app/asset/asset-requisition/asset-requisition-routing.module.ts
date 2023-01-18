import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssetRequisitionComponent } from './add-asset-requisition/add-asset-requisition.component';
import { ListAssetRequisitionComponent } from './list-asset-requisition/list-asset-requisition.component';

const routes: Routes = [
  {
    path: "listAssetRequisition",
    component: ListAssetRequisitionComponent,
  },
  {
    path: "addAssetRequisition/:id/:type",
    component: AddAssetRequisitionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRequisitionRoutingModule { }
