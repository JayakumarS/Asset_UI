import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAssetTypeComponent } from './list-asset-type/list-asset-type.component';

const routes: Routes = [
  {
    path: "listAssetType",
    component: ListAssetTypeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetTypeRoutingModule { }
