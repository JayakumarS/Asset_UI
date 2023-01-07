import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssetMasterComponent } from './add-asset-master/add-asset-master.component';
import { AddMultipleAssetMasterComponent } from './add-multiple-asset-master/add-multiple-asset-master.component';
import { AssetProfileViewComponent } from './asset-profile-view/asset-profile-view.component';
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
  {
    path: "viewAssetMaster/:id",
    component: AssetProfileViewComponent,
  },
  {
    path: "addMultipleAssetMaster",
    component: AddMultipleAssetMasterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetMasterRoutingModule { }
