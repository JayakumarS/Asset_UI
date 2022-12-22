import { NgModule } from '@angular/core';



import { RouterModule, Routes } from '@angular/router';
import { AddCountryMasterComponent } from './add-country-master/add-country-master.component';
import { ListCountryMasterComponent } from './list-country-master/list-country-master.component';
const routes: Routes = [
  {
    path: "add-CategoryMaster/:id",
    component: AddCountryMasterComponent,
  },
  {
    path: "list-CategoryMaster",
    component: ListCountryMasterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryMasterRoutingModule { }
