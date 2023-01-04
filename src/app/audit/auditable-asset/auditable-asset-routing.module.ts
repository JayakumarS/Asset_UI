import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuditableAssetComponent } from './add-auditable-asset/add-auditable-asset.component';
import { ListAuditableAssetComponent } from './list-auditable-asset/list-auditable-asset.component';

const routes: Routes = [

  {
    path:"listAuditableAsset",
    component:ListAuditableAssetComponent
  },
  {
    path:"addAuditableAsset/:id",
    component:AddAuditableAssetComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditableAssetRoutingModule { }
