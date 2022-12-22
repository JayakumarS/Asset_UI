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
    path: "scheduler",
    loadChildren: () =>
      import("./schedule-activity/schedule-activity.module").then((m) => m.ScheduleActivityModule),
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
