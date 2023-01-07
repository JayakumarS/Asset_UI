import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemCategoryComponent } from './add-item-category/add-item-category.component';
import { ListItemCategoryComponent } from './list-item-category/list-item-category.component';

const routes: Routes = [
  {
    path: "listItemCategory",
    component: ListItemCategoryComponent,
  },
  {
    path: "addItemCategory/:id",
    component: AddItemCategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemCategoryRoutingModule { }
