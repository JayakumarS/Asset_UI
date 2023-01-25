import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsageMonitorComponent } from './add-usage-monitor/add-usage-monitor.component';

const routes: Routes = [
  {
    path: "addUsageMonitor",
    component: AddUsageMonitorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsageMonitorRoutingModule { }
