import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { identity } from 'rxjs';
import { AddCompanyEmployeesComponent } from './add-company-employees/add-company-employees.component';
import { ListCompanyEmployeesComponent } from './list-company-employees/list-company-employees.component';

const routes: Routes = [
  {
    path: "addCompanyEmp/:id",
    component: AddCompanyEmployeesComponent,
  },
  {
    path: "listCompanyEmp",
    component: ListCompanyEmployeesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyEmployeesRoutingModule { }
