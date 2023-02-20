import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMaintenanceAndRepairComponent } from './add-maintenance-and-repair/add-maintenance-and-repair.component';
import { ListMaintenanceAndRepairComponent } from './list-maintenance-and-repair/list-maintenance-and-repair.component';

const routes: Routes = [
  {
    path:"addMaintenanceAndReport/:id",
    component:AddMaintenanceAndRepairComponent

  },
  {
    path:"listMaintenanceAndReport",
    component:ListMaintenanceAndRepairComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceAndRepairRoutingModule { }
