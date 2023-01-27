import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsergroupComponent } from './add-usergroup/add-usergroup.component';
import { ListUsergroupComponent } from './list-usergroup/list-usergroup.component';

const routes: Routes = [
  {
    path: "addusergroup",
    component: AddUsergroupComponent,
  },
  {
    path: "listusergroup",
    component: ListUsergroupComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsergroupRoutingModule { }
