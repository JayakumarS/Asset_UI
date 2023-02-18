import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLocationComponent } from '../location/add-location/add-location.component';
import { AddStateMasterComponent } from './add-state-master/add-state-master.component';
import { ListMasterComponent } from './list-state-master/list-master.component';

const routes: Routes = [
  {
    path: "addStateMaster/:id",
    component: AddStateMasterComponent,
  },
  {
    path: "listStateMaster",
    component: ListMasterComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
