import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListGroupHeadComponent } from 'src/app/finance/master/group-head/list-group-head-account/list-group-head-account.component';
const routes: Routes = [
  {
    path: "listGroupHeadComponent",
    component: ListGroupHeadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupHeadRoutingModule { }
