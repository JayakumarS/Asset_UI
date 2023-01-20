import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScheduldauitsComponent } from './add-scheduldauits/add-scheduldauits.component';
import { ListScheduledauditsComponent } from './list-scheduledaudits/list-scheduledaudits.component';
import { ScheduledViewComponent } from './scheduled-view/scheduled-view.component';

const routes: Routes = [
  {
    path:"list-scheduledaudits",
    component:ListScheduledauditsComponent
  },
  {
    path:"add-scheduledaudits/:id",
    component:AddScheduldauitsComponent
  },
  {
    path: "scheduled-view/:id",
    component: ScheduledViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledauditsRoutingModule { }
