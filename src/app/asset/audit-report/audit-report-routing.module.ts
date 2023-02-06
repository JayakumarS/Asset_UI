import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAuditReportComponent } from './list-audit-report/list-audit-report.component';

const routes: Routes = [
 

  {
    path: "listAuditReport",
    component: ListAuditReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditReportRoutingModule { }
