import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualReportComponent } from './individual-report/individual-report.component';

const routes: Routes = [

  {
    path:"Individual-list",
    component:IndividualReportComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualReportsRoutingModule { }
