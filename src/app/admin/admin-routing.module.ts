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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
