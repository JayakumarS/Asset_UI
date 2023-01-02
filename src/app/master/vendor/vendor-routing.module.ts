import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { ListVendorComponent } from './list-vendor/list-vendor.component';

const routes: Routes = [
  {
    path: "addVendor/:id",
    component: AddVendorComponent,
  },
  {
    path: "listVendor",
    component: ListVendorComponent,
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
