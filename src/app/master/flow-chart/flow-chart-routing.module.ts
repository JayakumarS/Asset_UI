import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFlowChartComponent } from './list-flow-chart/list-flow-chart.component';

const routes: Routes = [

  {
    path:"list-flowchart",
    component:ListFlowChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowChartRoutingModule { }
