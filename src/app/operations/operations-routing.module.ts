import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  {
    path: "billOfOperation",
    loadChildren: () =>
    import("./boo/boo.module").then((m) => m.BOOModule),
  },
  {
    path: "workOrder",
    loadChildren: () =>
    import("./work-order/work-order.module").then((m) => m.WorkOrderModule),
  },
  {
    path: "billOfMeterial",
    loadChildren: () =>
    import("./bom/bom.module").then((m) => m.BOMModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
