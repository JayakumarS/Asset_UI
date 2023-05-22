import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJewelleryReportComponent } from './add-jewellery-report/add-jewellery-report.component';

const routes: Routes = [

{
  path: "add-jewellery-report",
  component: AddJewelleryReportComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class JewelleryReportRoutingModule { }
