import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGrnComponent } from './add-grn/add-grn.component';
import { ListGrnComponent } from './list-grn/list-grn.component';


const routes: Routes = [
  {
    path: "listGrn",
    component: ListGrnComponent,
  },
  {
    path: "addGrn/:id",
    component: AddGrnComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrnRoutingModule { }
