import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyMasterModule } from './currency-master/currency-master.module';
import { CountryMasterModule } from './country-master/country-master.module';
import { DesignationMasterModule } from './designation-master/designation-master.module';
import { DepartmentMasterModule } from './department-master/department-master.module';

const routes: Routes = [
  {
    path: "currencyMaster",
    loadChildren: () =>
      import("./currency-master/currency-master.module").then((m) => m.CurrencyMasterModule),
  },
  {
    path: "category-Master",
    loadChildren: () =>
      import("./country-master/country-master.module").then((m) => m.CountryMasterModule),
  },
  {
    path: "Activity-master",
    loadChildren: () =>
      import("./designation-master/designation-master.module").then((m) => m.DesignationMasterModule),
  },
  {
    path: "department-Master",
    loadChildren: () =>
      import("./department-master/department-master.module").then((m) => m.DepartmentMasterModule),
  },
  {
    path: "vendor",
    loadChildren: () =>
    import("./commodity/commodity.module").then((m) => m.CommodityModule),
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
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
