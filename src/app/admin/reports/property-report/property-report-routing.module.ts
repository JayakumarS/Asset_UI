import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyReportComponent } from './property-report/property-report.component';

const routes: Routes = [
  {
    path:"add-property-report",
    component:PropertyReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyReportRoutingModule { }
