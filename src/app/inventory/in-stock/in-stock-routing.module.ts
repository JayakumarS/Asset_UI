import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInStockComponent } from './add-in-stock/add-in-stock.component';
import { ListInStockComponent } from './list-in-stock/list-in-stock.component';

const routes: Routes = [
{
  path:"add-instock/:id",
  component:AddInStockComponent,
},
{
  path:"list-instock",
  component:ListInStockComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InStockRoutingModule { }
