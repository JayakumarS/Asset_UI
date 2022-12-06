import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: "customerMaster",
    loadChildren: () =>
      import("./customer-master/customer-master.module").then((m) => m.CustomerMasterModule),
  },
   {
     path: "salesCallEntry",
   loadChildren: () =>
     import("./sales-call-entry/sales-call-entry.module").then((m) => m.SalesCallEntryModule),
  },
  {
    path: "territory",
    loadChildren: () =>
    import("./territory/territory.module").then((m) => m.TerritoryModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
    MatIconModule]
})
export class CRMRoutingModule { }
