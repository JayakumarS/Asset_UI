import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserWiseAssetCountComponent } from './user-wise-asset-count/user-wise-asset-count.component';

const routes: Routes = [

  {
    path:"user-wise-asset-count",
    component:UserWiseAssetCountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserWiseAssetCountRoutingModule { }
