import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';

const routes: Routes = [

  {
    path:"add-category/:id",
    component:AddCategoryComponent,
  },
  {
    path:"list-category",
    component:ListCategoryComponent,
  },

  {
    path:"view-category/:id",
    component:ViewCategoryComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
