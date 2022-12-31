import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuditReportComponent } from './add-audit-report/add-audit-report.component';
import { AddDepreciationReportComponent } from './add-depreciation-report/add-depreciation-report.component';
import { AddreportsComponent } from './addreports/addreports.component';

const routes: Routes = [
  {
    path:"addreports",
    component:AddreportsComponent,
  },
  {
    path:"addDepreciationReport",
    component:AddDepreciationReportComponent,
  },
  {
    path:"addAuditReport",
    component:AddAuditReportComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
