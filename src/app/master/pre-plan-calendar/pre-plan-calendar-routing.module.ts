import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrePlanCalendarListComponent } from './pre-plan-calendar-list/pre-plan-calendar-list.component';

const routes: Routes = [
  {
    path: "prePlanCalendar-list",
    component: PrePlanCalendarListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrePlanCalendarRoutingModule { }
