import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDiscardComponent } from './add-discard/add-discard.component';

const routes: Routes = [

  {
    path:"addDiscardAsset/:id",
    component:AddDiscardComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscardAssetRoutingModule { }
