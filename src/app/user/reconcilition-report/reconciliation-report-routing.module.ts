import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUtilityReportComponent } from '../utility-report/add-utility-report/add-utility-report.component';
import { AddReconciliationReportComponent } from './add-reconciliation-report/add-reconciliation-report.component';
import { ListReconciliationReportComponent } from './list-reconciliation-report/list-reconciliation-report.component';

const routes: Routes = [

  {
    path: "addUtilityChangeLogReport",
    component: AddReconciliationReportComponent,
  },
  {
    path: "listReconciliationReport",
    component: ListReconciliationReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconciliationReportRoutingModule { }
