import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBomComponent } from './list-bom/list-bom.component';
import { AddBomComponent } from './add-bom/add-bom.component';

const routes: Routes = [
  {
    path:"listBom",
    component:ListBomComponent,
  },
  {
    path:"addBom/:id",
    component:AddBomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BOMRoutingModule { }
