import { ListCommodityComponent } from './list-commodity/list-commodity.component';
import { AddCommodityComponent } from './add-commodity/add-commodity.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addCommodity/:id",
    component: AddCommodityComponent,
  },
  {
    path: "listCommodity",
    component: ListCommodityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommodityRoutingModule { }
