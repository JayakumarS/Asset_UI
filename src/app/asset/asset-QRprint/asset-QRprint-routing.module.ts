import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetPrintComponent } from './asset-print/asset-print.component';

const routes: Routes = [
  {
    path: "Asset-Print",
    component: AssetPrintComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetQRprintRoutingModule { }
