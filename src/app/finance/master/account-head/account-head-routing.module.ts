import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListAccountHeadComponent } from 'src/app/finance/master/account-head/list-account-head/list-account-head.component';
import { AddAccountHeadComponent } from 'src/app/finance/master/account-head/add-account-head/add-account-head.component';
const routes: Routes = [
  {
    path: "listAccountHeadComponent",
    component: ListAccountHeadComponent,
  },
  {
    path: "addAccountHeadComponent",
    component: AddAccountHeadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountHeadMasterRoutingModule { }
