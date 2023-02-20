import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowChartRoutingModule } from './flow-chart-routing.module';
import { ListFlowChartComponent } from './list-flow-chart/list-flow-chart.component';


@NgModule({
  declarations: [
    ListFlowChartComponent
  ],
  imports: [
    CommonModule,
    FlowChartRoutingModule
  ]
})
export class FlowChartModule { }
