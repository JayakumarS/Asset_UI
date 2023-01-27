import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleRightsComponent } from './add-role-rights/add-role-rights.component';

const routes: Routes = [
  {
    path: "addrolerights",
    component: AddRoleRightsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRightsRoutingModule { }
