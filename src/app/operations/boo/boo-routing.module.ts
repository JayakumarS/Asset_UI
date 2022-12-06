import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBooComponent } from './add-boo/add-boo.component';
import { ListBooComponent } from './list-boo/list-boo.component';


const routes: Routes = [
  {
    path:"listBoo",
    component:ListBooComponent,
  },
  {
    path:"addBoo/:id",
    component:AddBooComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BOORoutingModule { }
