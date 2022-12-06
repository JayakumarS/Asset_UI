import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddManageUomComponent } from './add-manage-uom/add-manage-uom.component';
import { ListManageUomComponent } from './list-manage-uom/list-manage-uom.component';

const routes: Routes = [
  {
    path:"add-uomManage/:id",
    component:AddManageUomComponent,
  },
  {
    path:"list-uomManage",
    component:ListManageUomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUOMRoutingModule { }
