import { ListTerritoryComponent } from './list-territory/list-territory.component';
import { AddTerritoryComponent } from './add-territory/add-territory.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addTerritory",
    component: AddTerritoryComponent,
  },
  {
    path: "listTerritory",
    component: ListTerritoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerritoryRoutingModule { }
