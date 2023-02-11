import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssetReplacementComponent } from './add-asset-replacement/add-asset-replacement.component';
import { ListAssetReplacementComponent } from './list-asset-replacement/list-asset-replacement.component';

const routes: Routes = [
  {
    path: "listAssetReplacement",
    component: ListAssetReplacementComponent,
  },
  {
    path: "addAssetReplacement/:id",
    component: AddAssetReplacementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetReplacementRoutingModule { }
