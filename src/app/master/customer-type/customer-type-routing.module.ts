import { ListCustomerComponent } from 'src/app/crm/customer-master/list-customer/list-customer.component';
import { AddComponent } from './add/add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addCustomer",
    component: AddComponent,
  },
  {
    path: "listCustomerType",
    component: ListCustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerTypeRoutingModule { }
