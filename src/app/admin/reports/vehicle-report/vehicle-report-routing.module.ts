import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleReportsComponent } from './vehicle-reports/vehicle-reports.component';

const routes: Routes = [
  {
    path: "vehicle-report",
    component: VehicleReportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleReportRoutingModule { }
