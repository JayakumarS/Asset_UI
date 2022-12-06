import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemMasterComponent } from './add-item-master/add-item-master.component';
import { ListItemMasterComponent } from './list-item-master/list-item-master.component';

const routes: Routes = [
  {
    path: "list-item-master",
    component: ListItemMasterComponent,
  },
  {
    path: "add-item-master/:id",
    component: AddItemMasterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemMasterRoutingModule { }
