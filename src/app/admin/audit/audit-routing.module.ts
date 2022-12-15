import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAuditComponent } from './manage-audit/manage-audit.component';

const routes: Routes = [

  {
    path:"list-designation",
    component:ManageAuditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }
