import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserMasterComponent } from './add-user-master/add-user-master.component';
import { DeleteUserMasterComponent } from './list-user-master/delete-user-master/delete-user-master.component';
import { ListUserMasterComponent } from './list-user-master/list-user-master.component';

const routes: Routes = [
  {
    path: "add-user-master/:id",
    component: AddUserMasterComponent
  },
  {
    path: "list-user-master",
    component: ListUserMasterComponent
  },
  {
    path: "delete-user-master",
    component: DeleteUserMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMasterRoutingModule { }
