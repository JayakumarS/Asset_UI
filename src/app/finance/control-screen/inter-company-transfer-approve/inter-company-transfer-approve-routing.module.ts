import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListInterCompanyTransferApproveComponent } from 'src/app/finance/control-screen/inter-company-transfer-approve/list-inter-company-transfer-approve/list-inter-company-transfer-approve.component';
const routes: Routes = [
  {
    path: "listInterCompanyTransferApprove",
    component: ListInterCompanyTransferApproveComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterCompanyTransferApproveRoutingModule { }
