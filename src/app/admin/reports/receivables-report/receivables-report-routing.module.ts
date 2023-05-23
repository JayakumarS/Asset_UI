import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivablesreportComponent } from './receivablesreport/receivablesreport.component';


const routes: Routes = [
  {
    path:"add-receivablesreport",
    component:ReceivablesreportComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceivablesReportRoutingModule { }
