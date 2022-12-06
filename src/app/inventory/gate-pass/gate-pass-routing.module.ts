import { ListGatePassComponent } from './list-gate-pass/list-gate-pass.component';
import { AddGatePassComponent } from './add-gate-pass/add-gate-pass.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addGatePass",
    component: AddGatePassComponent,
  },
  {
    path: "listGatePass",
    component: ListGatePassComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatePassRoutingModule { }
