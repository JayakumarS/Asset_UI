import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLineMasterComponent } from './add-line-master/add-line-master.component';
import { ListLineMasterComponent } from './list-line-master/list-line-master.component';

const routes: Routes = [
  {
    path: "addLine/:id",
    component: AddLineMasterComponent,
  },
  {
    path: "listLine",
    component: ListLineMasterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineMasterRoutingModule { }
