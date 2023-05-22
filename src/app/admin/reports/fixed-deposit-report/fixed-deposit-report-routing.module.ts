import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixedDepositReportsComponent } from './fixed-deposit-reports/fixed-deposit-reports.component';

const routes: Routes = [
 {
  path: "fixed-deposit-reports",
  component: FixedDepositReportsComponent,
 }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedDepositReportRoutingModule { }
