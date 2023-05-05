import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPropertyComponent } from './list-property/list-property.component';
import { AddPropertyComponent } from './add-property/add-property.component';

const routes: Routes = [
  {
    path: "add-property/:id",
    component: AddPropertyComponent,
  },
  {
    path: "list-property",
    component: ListPropertyComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
