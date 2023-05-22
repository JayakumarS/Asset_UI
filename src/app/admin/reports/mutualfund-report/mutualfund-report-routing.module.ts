import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMutualfundReportComponent } from './add-mutualfund-report/add-mutualfund-report.component';

const routes: Routes = [
  {
    path:"add-mutualfund-report",
    component:AddMutualfundReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MutualfundReportRoutingModule { }
