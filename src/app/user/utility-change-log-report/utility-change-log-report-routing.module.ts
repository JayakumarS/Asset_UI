import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUtilityReportComponent } from '../utility-report/add-utility-report/add-utility-report.component';
import { AddUtilityChangeLogReportComponent } from './add-utility-change-log-report/add-utility-change-log-report.component';

const routes: Routes = [

  {
    path: "addUtilityChangeLogReport",
    component: AddUtilityChangeLogReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityChangeLogReportRoutingModule { }
