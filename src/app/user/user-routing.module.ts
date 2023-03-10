import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReconciliationReportModule } from './reconcilition-report/reconciliation-report.module';
import { UtilityChangeLogReportModule } from './utility-change-log-report/utility-change-log-report.module';

const routes: Routes = [
  {
    path: "usageMonitor",
    loadChildren: () =>
    import("./usage-monitor/usage-monitor.module").then((m)=>m.UsageMonitorModule)
    
  },
  {
    path: "utilityReport",
    loadChildren: () =>
    import("./utility-report/utility-report.module").then((m)=>m.UtilityReportModule)
    
  },
  {
    path: "utilityChangeLogReport",
    loadChildren: () =>
    import("./utility-change-log-report/utility-change-log-report.module").then((m)=>UtilityChangeLogReportModule)
    
  },
  {
    path: "reconciliationReport",
    loadChildren: () =>
    import("./reconcilition-report/reconciliation-report.module").then((m)=>ReconciliationReportModule)
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
