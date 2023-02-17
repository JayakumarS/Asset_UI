import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStatusMasterComponent } from './add-status-master/add-status-master.component';
import { ListStatusMasterComponent } from './list-status-master/list-status-master.component';

const routes: Routes = [{
  path:"addStatus/:id",
  component:AddStatusMasterComponent,
},
{
path:"listStatus",
component:ListStatusMasterComponent,
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule { }
