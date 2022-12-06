import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

import { AddLopComponent } from './add-lop/add-lop.component';

import { ListLpoComponent } from './list-lpo/list-lpo.component';

const routes: Routes = [
  {
    path: "addLop",
    component: AddLopComponent,
  },
  {
    path: "listLpo",
    component: ListLpoComponent,
  },
  { path: "**", component: Page404Component },
  // {
  //   path: "formPage",
  //   component: AddLopComponent,
  // },
 
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LopRoutingModule { }
