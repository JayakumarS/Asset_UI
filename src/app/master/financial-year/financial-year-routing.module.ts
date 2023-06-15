import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFinancialYearComponent } from './list-financial-year/list-financial-year.component';

const routes: Routes = [
  {
    path: "listFinancial",
    component: ListFinancialYearComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialYearRoutingModule { }
