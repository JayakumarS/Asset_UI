import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleMasterComponent } from './add-role-master/add-role-master.component';
import { ListRoleMasterComponent } from './list-role-master/list-role-master.component';

const routes: Routes = [
  {
    path: "listRoleMaster",
    component: ListRoleMasterComponent,
  },{
    path: "addRoleMaster/:id",
    component: AddRoleMasterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleMasterRoutingModule { }
