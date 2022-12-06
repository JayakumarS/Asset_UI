import { ListLocationComponent } from './list-location/list-location.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addLocation/:id",
    component: AddLocationComponent,
  },
  {
    path: "listLocation",
    component: ListLocationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
