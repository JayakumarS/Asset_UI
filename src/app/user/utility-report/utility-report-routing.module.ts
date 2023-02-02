import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUtilityReportComponent } from './add-utility-report/add-utility-report.component';
import { ListUtilityReportComponent } from './list-utility-report/list-utility-report.component';

const routes: Routes = [
  {
    path: "addUtilityReport",
    component: AddUtilityReportComponent,
  },
  {
    path: "listUtilityReport",
    component: ListUtilityReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityReportRoutingModule { }
