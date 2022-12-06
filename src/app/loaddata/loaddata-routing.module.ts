import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLoadComponent } from './add-load/add-load.component';

const routes: Routes = [
  {
    path: "load-master",
    component: AddLoadComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoaddataRoutingModule { }
