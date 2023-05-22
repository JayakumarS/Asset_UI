import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanReportComponent } from './loan-report/loan-report.component';

const routes: Routes = [
  {
    path:"loan-report",
    component:LoanReportComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanReportRoutingModule { 
  

}
