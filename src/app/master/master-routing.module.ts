import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyMasterModule } from './currency-master/currency-master.module';
import { CountryMasterModule } from './country-master/country-master.module';
import { DesignationMasterModule } from './Activity-Master/designation-master.module';
import { DepartmentMasterModule } from './department-master/department-master.module';

const routes: Routes = [

  {
    path: "flowChart",
    loadChildren: () =>
      import("./flow-chart/flow-chart-routing.module").then((m) => m.FlowChartRoutingModule),
  },
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
  {
    path: "status",
    loadChildren: () =>
      import("./status/status.module").then((m) => m.StatusModule)
  },
  {
    path: "tax",
    loadChildren: () =>
      import("./Tax/tax.module").then((m) => m.TaxModule)
  },
  {
    path: "depreciation",
    loadChildren: () =>
      import("./depreciation/depreciation.module").then((m) => m.DepreciationModule),
  },
  {
    path: "category",
    loadChildren: () =>
      import("./category/category.module").then((m) => m.CategoryModule),
  },
  {
    path: "roleMaster",
    loadChildren: () =>
      import("./role-master/role-master.module").then((r) => r.RoleMasterModule),
  }, {
    path: "rolerights",
    loadChildren: () =>
      import("./role-rights/role-rights.module").then((m) => m.RoleRightsModule),
  },
  {
    path: "Branch",
  loadChildren: () =>
  import("./branch/branch.module").then((m) => m.BranchModule),
  },
  {
    path: "Company-Employees",
  loadChildren: () =>
  import("./company-employees/company-employees.module").then((m) => m.CompanyEmployeesModule )
  },

  // import("./category/category.module").then((m) => m.CategoryModule),
  // },
   {
  path: "usergroup",
   loadChildren: () =>
    import("./usergroup/usergroup.module").then((m) => m.UsergroupModule),
  },
    {
    path: "stateMaster",
     loadChildren: () =>
      import("./state/state.module").then((m) => m.StateModule),
    },
    //  {
    //   path: "cityMaster",
    //    loadChildren: () =>
    //     import("./city/city-routing.module").then((m) => m.CityRoutingModule),
    //   },
    {
      path: "cityMaster",
       loadChildren: () =>
        import("./city-master/city-master.module").then((m) => m.CityMasterModule),
      },


  {
    path: "company-logo",
    loadChildren: () =>
    import("./company-logo/company-logo.module").then((m) => m.CompanyLogoModule),
  },
  {
    path: "brand",
    loadChildren: () =>
    import("./brand/brand.module").then((m) => m.BrandModule)
  },
  {
    path: "brand",
    loadChildren: () =>
    import("./brand/brand.module").then((m) => m.BrandModule)
  },
  {
    path: "line",
    loadChildren: () =>
    import("./line-master/line-master.module").then((m) => m.LineMasterModule)
  },
  {
    path: "exchange",
    loadChildren: () =>
    import("./Exchange/exchange.module").then((m) => m.ExchangeModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
