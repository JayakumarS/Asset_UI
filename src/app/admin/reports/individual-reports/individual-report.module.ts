import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndividualReportsRoutingModule } from './individual-report-routing.module';
import { IndividualReportComponent } from './individual-report/individual-report.component';


@NgModule({
  declarations: [
    IndividualReportComponent
  ],
  imports: [
    CommonModule,
    IndividualReportsRoutingModule
  ]
})
export class IndividualReportsModule { }
