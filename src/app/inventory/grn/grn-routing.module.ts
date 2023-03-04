import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGrnComponent } from './add-grn/add-grn.component';
import { GrnPrintComponent } from './list-grn/grn-print/grn-print.component';
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
  {
    path: "printGrn",
    component: GrnPrintComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrnRoutingModule { }
