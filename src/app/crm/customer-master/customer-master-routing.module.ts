import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomerComponent } from 'src/app/crm/customer-master/list-customer/list-customer.component';
import { AddCustomerComponent } from 'src/app/crm/customer-master/add-customer/add-customer.component';
const routes: Routes = [
  {
    path: "listCustomer",
    component: ListCustomerComponent,
  },
  {
    path: "addCustomer/:id",
    component: AddCustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerMasterRoutingModule { }
