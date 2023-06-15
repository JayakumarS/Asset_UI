import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialYearRoutingModule } from './financial-year-routing.module';
import { AddFinancialYearComponent } from './add-financial-year/add-financial-year.component';
import { ListFinancialYearComponent } from './list-financial-year/list-financial-year.component';


@NgModule({
  declarations: [
    AddFinancialYearComponent,
    ListFinancialYearComponent
  ],
  imports: [
    CommonModule,
    FinancialYearRoutingModule
  ]
})
export class FinancialYearModule { }
