import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "accountHead",
    loadChildren: () =>
    import("./account-head/account-head.module").then((m) => m.AccountHeadMasterModule),
  },
  {
    path: "subGroupAccount",
    loadChildren: () =>
    import("./sub-group-code/sub-group-account.module").then((m) => m.SubGroupAccountModule),
  },
  {
    path: "groupHead",
    loadChildren: () =>
    import("./group-head/group-head.module").then((m) => m.GroupHeadModule),
  },
  {
    path: "currency",
    loadChildren: () =>
    import("./currency/currency.module").then((m) => m.CurrencyModule),
  },
  {
    path: "chartOfAccounts",
    loadChildren: () =>
    import("./chart-of-accounts/chart-of-accounts.module").then((m) => m.ChartOfAccountsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
