import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "accountingyearclose",
    loadChildren: () =>
    import("./accounting-year-close/accounting-year-close.module").then((m) => m.AccountingYearModule),
  },
  {
    path: "intercompanytransfer",
    loadChildren: () =>
    import("./inter-company-transfer/inter-company-transfer.module").then((m) => m.InterCompanyTransferModule),
  },
  {
    path: "intercompanytransferapprove",
    loadChildren: () =>
    import("./inter-company-transfer-approve/inter-company-transfer-approve.module").then((m) => m.InterCompanyTransferApproveModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlScreenRoutingModule { }
