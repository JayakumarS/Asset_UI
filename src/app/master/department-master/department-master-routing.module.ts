import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentMasterComponent } from './add-department-master/add-department-master.component';
import { ListDepartmentMasterComponent } from './list-department-master/list-department-master.component';
const routes: Routes = [
  {
    path:"add-department/:id",
    component:AddDepartmentMasterComponent,
  },
  {
    path:"list-department",
    component:ListDepartmentMasterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentMasterRoutingModule { }
