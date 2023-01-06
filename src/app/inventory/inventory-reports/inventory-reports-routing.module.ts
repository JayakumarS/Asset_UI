import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInventoryReportsComponent } from './list-inventory-reports/list-inventory-reports.component';

const routes: Routes = [
  {
    path: "list-inventory-reports",
    component: ListInventoryReportsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryReportsRoutingModule { }
