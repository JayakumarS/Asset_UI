import { ListStockVerificationComponent } from './list-stock-verification/list-stock-verification.component';
import { AddStockVerificationComponent } from './add-stock-verification/add-stock-verification.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addStockVerification/:id",
    component: AddStockVerificationComponent,
  },
  {
    path: "listStockVerification",
    component: ListStockVerificationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockVerificationRoutingModule { }
