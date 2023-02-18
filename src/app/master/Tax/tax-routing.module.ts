import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaxMasterComponent } from './add-tax-master/add-tax-master.component';
import { ListTaxMasterComponent } from './list-tax-master/list-tax-master.component';

const routes: Routes = [{
  path:"addTax/:id",
  component:AddTaxMasterComponent,
},
{
path:"listTax",
component:ListTaxMasterComponent,
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule { }
