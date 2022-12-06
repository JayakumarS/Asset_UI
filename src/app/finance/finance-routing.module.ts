import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "billing",
    loadChildren: () =>
    import("./billing/billing.module").then((m) => m.BillingModule),
  },

  {
    path: "transaction",
    loadChildren: () =>
    import("./transaction/transaction.module").then((m) => m.TransactionModule),
  },
  {
    path: "master",
    loadChildren: () =>
    import("./master/master.module").then((m) => m.MasterModule),
  },
  {
    path: "controlscreen",
    loadChildren: () =>
    import("./control-screen/control-screen.module").then((m) => m.ControlScreenModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
