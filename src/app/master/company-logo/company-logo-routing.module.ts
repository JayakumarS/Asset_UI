import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCompanyLogoComponent } from './list-company-logo/list-company-logo.component';

const routes: Routes = [
  {
    path: "list-company-logo",
    component: ListCompanyLogoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyLogoRoutingModule { }
