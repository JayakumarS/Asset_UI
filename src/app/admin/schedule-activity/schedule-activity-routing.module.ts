import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScheduleActivityComponent } from './add-schedule-activity/add-schedule-activity.component';
import { ListScheduleActivityComponent } from './list-schedule-activity/list-schedule-activity.component';

const routes: Routes = [
{
  path:"add-schedule-activity/:id",
  component:AddScheduleActivityComponent,
},
{
  path:"list-schedule-activity",
  component:ListScheduleActivityComponent,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleActivityRoutingModule { }
