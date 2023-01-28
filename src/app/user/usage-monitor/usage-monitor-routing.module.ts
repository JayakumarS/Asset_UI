import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsageMonitorComponent } from './add-usage-monitor/add-usage-monitor.component';
import { ListUsageMonitorComponent } from './list-usage-monitor/list-usage-monitor.component';

const routes: Routes = [
  {
    path: "addUsageMonitor",
    component: AddUsageMonitorComponent,
  },
  {
    path: "listUsageMonitor",
    component: ListUsageMonitorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsageMonitorRoutingModule { }
