import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListInterCompanyTransferComponent } from 'src/app/finance/control-screen/inter-company-transfer/list-inter-company-transfer/list-inter-company-transfer.component';
import { AddInterCompanyTransferComponent } from 'src/app/finance/control-screen/inter-company-transfer/add-inter-company-transfer/add-inter-company-transfer.component';
const routes: Routes = [
  {
    path: "listInterCompanyTransfer",
    component: ListInterCompanyTransferComponent,
  },
  {
    path: "addInterCompanyTransfer",
    component: AddInterCompanyTransferComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterCompanyTransferRoutingModule { }
