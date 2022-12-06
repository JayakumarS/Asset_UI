import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { FinanceRoutingModule } from './finance-routing.module';

const routes: Routes = [
  {
    path: "AccountHeadMaster",
    loadChildren: () =>
      import("./master/account-head/account-head.module").then((m) => m.AccountHeadMasterModule),
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
