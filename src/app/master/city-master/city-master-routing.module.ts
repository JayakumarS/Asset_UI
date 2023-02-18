import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCityComponent } from './add-city/add-city.component';
import { ListCityComponent } from './list-city/list-city.component';

const routes: Routes = [
  {
    path: "addCity/:id",
    component: AddCityComponent,
  },
  {
    path: "listCity",
    component: ListCityComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityMasterRoutingModule { }
