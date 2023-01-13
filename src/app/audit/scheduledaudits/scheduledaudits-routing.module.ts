import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScheduldauitsComponent } from './add-scheduldauits/add-scheduldauits.component';
import { ListScheduledauditsComponent } from './list-scheduledaudits/list-scheduledaudits.component';

const routes: Routes = [
  {
    path:"list-scheduledaudits",
    component:ListScheduledauditsComponent
  },
  {
    path:"add-scheduledaudits/:id",
    component:AddScheduldauitsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledauditsRoutingModule { }
