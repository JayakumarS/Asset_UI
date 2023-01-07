import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { ListCompanyComponent } from './list-company/list-company.component';

const routes: Routes = [
  {
    path: "addCompany/:id",
    component: AddCompanyComponent,
  },
  {
    path: "listCompany",
    component: ListCompanyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
