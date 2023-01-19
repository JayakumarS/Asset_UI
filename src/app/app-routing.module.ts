import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./authentication/page404/page404.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { Role } from "./core/models/role";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
      {
        path: "admin",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./admin/admin.module").then((m) => m.AdminModule),
      },
      // {
      //   path: "asset",
      //   canActivate: [AuthGuard],
      //   data: {
      //     role: Role.Admin,
      //   },
      //   loadChildren: () =>
      //     import("./asset/asset.module").then((m) => m.AssetModule),
      // },
      {
        path: "employee",
        canActivate: [AuthGuard],
        data: {
          role: Role.Employee,
        },
        loadChildren: () =>
          import("./employee/employee.module").then((m) => m.EmployeeModule),
      },
      {
        path: "client",
        canActivate: [AuthGuard],
        data: {
          role: Role.Client,
        },
        loadChildren: () =>
          import("./client/client.module").then((m) => m.ClientModule),
      },
      {
        path: "extra-pages",
        loadChildren: () =>
          import("./extra-pages/extra-pages.module").then(
            (m) => m.ExtraPagesModule
          ),
      },
      {
        path: "multilevel",
        loadChildren: () =>
          import("./multilevel/multilevel.module").then(
            (m) => m.MultilevelModule
          ),
      },
      {
        path: "inventory",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./inventory/inventory.module").then((m) => m.InventoryModule),
      },
      {
        path: "crm",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./crm/crm.module").then((m) => m.CRMModule),
      },
      {
        path: "master",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./master/master-routing.module").then((m) => m.MasterRoutingModule),
      },
      {
        path: "marketing",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./marketing/marketing.module").then((m) => m.MarketingModule),
      },
      {
        path: "purchase",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./purchase/purchase.module").then((m) => m.PurchaseModule),
      },
      {
        path:"operations",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./operations/operations.module").then((m) => m.OperationsModule),
      },
      {
        path: "finance",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
        import("./finance/finance.module").then((m) => m.FinanceModule),
      },
      {
        path: "loaddata",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
        import("./loaddata/loaddata.module").then((m) => m.LoaddataModule),
      },
      {
        path: "asset",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
        import("./asset/asset.module").then((m) => m.AssetModule),
      },
      {
        path: "audit",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
        import("./audit/audit.module").then((m) => m.AuditModule),
      },
      {
        path: "helpdesk",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
        import("./helpdesk/helpdesk.module").then((m) => m.HelpdeskModule),
      },
      {
        path: "payments",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
        import("./payments/payments.module").then((m) => m.PaymentsModule),
      },
    ],
  },
  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  // {
  //   path: "purchase",
  //   canActivate: [AuthGuard],
  //   data: {
  //     role: Role.Admin,
  //   },
  //   loadChildren: () =>
  //     import("./purchase/purchase.module").then((m) => m.PurchaseModule),
  // },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
