import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStateMasterComponent } from './add-state-master/add-state-master.component';
import { ListStateMasterComponent } from './list-state-master/list-state-master.component';

const routes: Routes = [
  {
    path: "addStateMaster/:id",
    component: AddStateMasterComponent,
  },
  {
    path: "listStateMaster",
    component: ListStateMasterComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
