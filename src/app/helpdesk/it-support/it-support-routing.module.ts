import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItSupportComponent } from './add-it-support/add-it-support.component';
import { ListItSupportComponent } from './list-it-support/list-it-support.component';

const routes: Routes = [
  {
    path: "listitsupport",
    component: ListItSupportComponent
  },
  {
    path: "additsupport",
    component: AddItSupportComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItSupportRoutingModule { }
