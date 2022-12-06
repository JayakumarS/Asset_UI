import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUOMCategoryComponent } from './add-uom-category/add-uom-category.component';
import { ListUOMCategoryComponent } from './list-uom-category/list-uom-category.component';

const routes: Routes = [
  {
    path:"add-UOMCategory/:id",
    component:AddUOMCategoryComponent,
  },
  {
    path:"list-UOMCategory",
    component:ListUOMCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UOMCategoryRoutingModule { }
