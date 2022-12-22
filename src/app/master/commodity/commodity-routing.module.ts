import { ListCommodityComponent } from './list-commodity/list-commodity.component';
import { AddCommodityComponent } from './add-commodity/add-commodity.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addVendor/:id",
    component: AddCommodityComponent,
  },
  {
    path: "listVendor",
    component: ListCommodityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommodityRoutingModule { }
