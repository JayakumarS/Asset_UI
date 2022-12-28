import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssetMasterComponent } from './add-asset-master/add-asset-master.component';
import { ListAssetMasterComponent } from './list-asset-master/list-asset-master.component';

const routes: Routes = [
  {
    path: "listAssetMaster",
    component: ListAssetMasterComponent,
  },
  {
    path: "addAssetMaster/:id",
    component: AddAssetMasterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetMasterRoutingModule { }
