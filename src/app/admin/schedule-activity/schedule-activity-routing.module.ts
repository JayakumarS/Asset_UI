import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScheduleActivityComponent } from './add-schedule-activity/add-schedule-activity.component';

const routes: Routes = [
{
  path:"add-schedule-activity",
  component:AddScheduleActivityComponent,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleActivityRoutingModule { }
