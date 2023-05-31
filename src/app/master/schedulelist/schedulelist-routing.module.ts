import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSchedulelistComponent } from './add-schedulelist/add-schedulelist.component';

const routes: Routes = [

  {
    path: "add-schedulelist",
    component: AddSchedulelistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulelistRoutingModule { }
