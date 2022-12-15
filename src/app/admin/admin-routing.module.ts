import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "asset",
    loadChildren: () =>
      import("./employees/employees.module").then((m) => m.EmployeesModule),
  },
  {

    path: "transferasset",
    loadChildren: () =>
      import("./transferasset/transferasset.module").then((m) => m.TransferassetModule),
  },
  {
    path: "audit",
    loadChildren: () =>
      import("./audit/audit.module").then((m) => m.AuditModule)

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
