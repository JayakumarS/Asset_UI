import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItSupportComponent } from './add-it-support/add-it-support.component';
import { ListItSupportComponent } from './list-it-support/list-it-support.component';
import {ViewItSupportComponent } from './view-it-support/view-it-support.component';

const routes: Routes = [
  {
    path: "listitsupport",
    component: ListItSupportComponent
  },
  {
    path: "additsupport/:id",
    component: AddItSupportComponent

  },
    {
     path: "viewitsupport/:id",
     component: ViewItSupportComponent
    },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItSupportRoutingModule { }
