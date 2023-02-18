import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuditReportComponent } from './add-audit-report/add-audit-report.component';
import { AddDepreciationReportComponent } from './add-depreciation-report/add-depreciation-report.component';
import { AddreportsComponent } from './addreports/addreports.component';
import { AssetsReturnComponent } from './assets-return/assets-return.component';
import { DiscardAssetsComponent } from './discard-assets/discard-assets.component';
import { ListAssetHistoryReportComponent } from './list-asset-history-report/list-asset-history-report.component';
import { UserLogComponent } from './user-log/user-log.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
