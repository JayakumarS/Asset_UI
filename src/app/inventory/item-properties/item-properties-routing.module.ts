import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListItemPropertiesComponent } from './list-item-properties/list-item-properties.component';
import { AddItemPropertiesComponent } from './add-item-properties/add-item-properties.component';

const routes: Routes = [
  {
    path:"add-itemproperties/:id",
    component:AddItemPropertiesComponent,
  },
  {
    path:"list-itemproperties",
    component:ListItemPropertiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemPropertiesRoutingModule { }
