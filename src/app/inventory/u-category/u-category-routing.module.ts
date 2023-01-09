import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUomComponent } from './add-uom/add-uom.component';
import { ListUomComponent } from './list-uom/list-uom.component';

const routes: Routes = [
  {
    path: "add-UOM-Category/:id",
    component: AddUomComponent,
  },
  {
    path: "list-UOM-Category",
    component: ListUomComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UCategoryRoutingModule { }
