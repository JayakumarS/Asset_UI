import { ListWorkOrderComponent } from './list-work-order/list-work-order.component';
import { AddWorkOrderComponent } from './add-work-order/add-work-order.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addWorkOrder/:id",
    component: AddWorkOrderComponent,
  },
  {
    path: "listWorkOrder",
    component: ListWorkOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }
