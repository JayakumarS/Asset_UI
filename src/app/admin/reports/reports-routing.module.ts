import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddreportsComponent } from './addreports/addreports.component';

const routes: Routes = [
  {
  
    path:"addreports",
    component:AddreportsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
