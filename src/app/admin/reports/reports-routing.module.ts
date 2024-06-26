import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuditReportComponent } from './add-audit-report/add-audit-report.component';
import { AddDepreciationReportComponent } from './add-depreciation-report/add-depreciation-report.component';
import { AddreportsComponent } from './addreports/addreports.component';
import { AssetsReturnComponent } from './assets-return/assets-return.component';
import { DiscardAssetsComponent } from './discard-assets/discard-assets.component';
import { ListAssetHistoryReportComponent } from './list-asset-history-report/list-asset-history-report.component';
import { UserLogComponent } from './user-log/user-log.component';
import { AddHistoryReportComponent } from './add-history-report/add-history-report.component';

const routes: Routes = [
  {
    path:"addreports",
    component:AddreportsComponent,
  },
  {
    path:"addDepreciationReport",
    component:AddDepreciationReportComponent,
  },
  {
    path:"addAuditReport",
    component:AddAuditReportComponent,
  },
  {
    path:"assets-return",
    component:AssetsReturnComponent,
  },
  {
    path:"discarded-assets",
    component:DiscardAssetsComponent,
  },
  {
    path:"user_log",
    component:UserLogComponent,

  },
  {
    path:"listAssetHistoryReport",
    component:ListAssetHistoryReportComponent
  },
  {
    path: "auditLog",
    loadChildren: () =>
      import("./audit-log/audit-log.module").then((m) => m.AuditLogModule),
  },

  {
    path:"addHistoryReport",
    component:AddHistoryReportComponent
  },
  {
    path: "loanreport",
    loadChildren: () =>
    import("./loan-report/loan-report.module").then((m) => m.LoanReportModule)
   },
   {
    path: "mutualfundReport",
    loadChildren: () =>
    import("./mutualfund-report/mutualfund-report.module").then((m) => m.MutualfundReportModule)
  },
  {
  path:"vehicleReport",
  loadChildren: () =>
    import("./vehicle-report/vehicle-report.module").then((m) => m.VehicleReportModule),
 
},
  {
    path: "jewelleryReport",
    loadChildren: () =>
    import("./jewellery-report/jewellery-report.module").then((m) => m.JewelleryReportModule)
  },
  {
  path: "fixeddeposit-Report",
    loadChildren: () =>
      import("./fixed-deposit-report/fixed-deposit-report.module").then((m)=>m.FixedDepositReportModule)
  },
  {
    path: "individual-asset-report",
    loadChildren: () =>
      import("./individual-asset-report/individual-asset-report.module").then((m) => m.IndividualAssetReportModule),
  },
  {
  path: "receivables-report",
  loadChildren: () =>
    import("./receivables-report/receivables-report.module").then((m)=>m.ReceivablesReportModule)
},

{
  path: "property-report",
  loadChildren: () =>
  import("./property-report/property-report.module").then((m)=>m.PropertyReportModule)

},
{
  path: "userWiseAssetCount",
  loadChildren: () =>
  import("./user-wise-asset-count/user-wise-asset-count.module").then((m)=>m.UserWiseAssetCountModule)

},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
