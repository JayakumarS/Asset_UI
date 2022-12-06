import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehousePositioningComponent } from './warehouse-positioning.component';

const routes: Routes = [
  {
    path:"warehouse-positioning",
    component:WarehousePositioningComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehousePositioningRoutingModule { }
