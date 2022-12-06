import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListSubGroupAccountComponent } from 'src/app/finance/master/sub-group-code/list-sub-group-account/list-sub-group-account.component';
import { AddSubGroupAccountComponent } from 'src/app/finance/master/sub-group-code/add-sub-group-account/add-sub-group-account.component';
const routes: Routes = [
  {
    path: "listSubGroupAccountComponent",
    component: ListSubGroupAccountComponent,
  },
  {
    path: "addSubGroupAccountComponent",
    component: AddSubGroupAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubGroupAccountRoutingModule { }
