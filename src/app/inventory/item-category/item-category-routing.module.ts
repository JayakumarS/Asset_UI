import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { AddPropertiesComponent } from './add-properties/add-properties.component';

const routes: Routes = [
  {
    path: "list-category",
    component: ListCategoryComponent,
  },
  {
    path: "add-category/:id",
    component: AddCategoryComponent,
  },
  {
    path: "add-properties",
    component: AddPropertiesComponent,
  },
 
  

  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemCategoryRoutingModule { }
