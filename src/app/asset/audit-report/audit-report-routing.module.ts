import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuditReportComponent } from './add-audit-report/add-audit-report.component';

const routes: Routes = [
  {
    path: "addAuditReport",
    component: AddAuditReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditReportRoutingModule { }
