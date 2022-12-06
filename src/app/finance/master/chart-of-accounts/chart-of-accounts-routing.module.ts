import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListChartOfAccountsComponent } from 'src/app/finance/master/chart-of-accounts/list-chart-of-accounts/list-chart-of-accounts.component';
const routes: Routes = [
  {
    path: "listChartOfAccountsComponent",
    component: ListChartOfAccountsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartOfAccountsRoutingModule { }
