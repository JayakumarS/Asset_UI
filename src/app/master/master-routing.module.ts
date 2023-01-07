import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyMasterModule } from './currency-master/currency-master.module';
import { CountryMasterModule } from './country-master/country-master.module';
import { DesignationMasterModule } from './Activity-Master/designation-master.module';
import { DepartmentMasterModule } from './department-master/department-master.module';

const routes: Routes = [
  {
    path: "currencyMaster",
    loadChildren: () =>
      import("./currency-master/currency-master.module").then((m) => m.CurrencyMasterModule),
  },
  {
    path: "countryMaster",
    loadChildren: () =>
      import("./country-master/country-master.module").then((m) => m.CountryMasterModule),
  },
  {
    path: "Activity-master",
    loadChildren: () =>
      import("./Activity-Master/designation-master.module").then((m) => m.DesignationMasterModule),
  },
  {
    path: "department-Master",
    loadChildren: () =>
      import("./department-master/department-master.module").then((m) => m.DepartmentMasterModule),
  },
  {
    path: "vendor",
    loadChildren: () =>
    import("./vendor/vendor.module").then((m) => m.VendorModule),
  },
  {
    path: "customerType",
    loadChildren: () =>
    import("./customer-type/customer-type.module").then((m) => m.CustomerTypeModule),
  },
  {
    path: "location",
    loadChildren: () =>
    import("./location/location.module").then((m) => m.LocationModule),
  },
   {
     path: "customer",
     loadChildren: () =>
     import("./customer/customer.module").then((m) => m.CustomerModule),
   },
   {
    path: "userMaster",
    loadChildren: () =>
    import("./user-master/user-master.module").then((m) => m.UserMasterModule),
  },
  {
    path: "company",
    loadChildren: () => 
    import("./company/company.module").then((m) => m.CompanyModule)
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
