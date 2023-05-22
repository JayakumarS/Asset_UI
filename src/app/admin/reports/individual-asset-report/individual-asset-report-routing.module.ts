import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetReportComponent } from './asset-report/asset-report.component';

const routes: Routes = [
  {
    path: "asset-report",
    component: AssetReportComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualAssetReportRoutingModule { }
