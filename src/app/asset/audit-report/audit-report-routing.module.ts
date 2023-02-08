import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAuditReportComponent } from './list-audit-report/list-audit-report.component';
import { PrintAuditReportComponent } from './print-audit-report/print-audit-report.component';

const routes: Routes = [
 

  {
    path: "listAuditReport",
    component: ListAuditReportComponent,
  },

  {
    path: "printAuditReport/:id",
    component: PrintAuditReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditReportRoutingModule { }
