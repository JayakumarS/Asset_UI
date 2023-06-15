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
  {
    path: "console-log",
    loadChildren: () =>
    import("./console-log/console-log.module").then((m) => m.ConsoleLogMasterModule)
  },
  {
    path: "vehicle",
    loadChildren: () =>
    import("./vehicle/vehicle.module").then((m) => m.VehicleModule)
 },
 {
  path: "Fixed-deposit",
  loadChildren: () =>
  import("./Fixed-deposit/fixed-deposit.module").then((m) => m.FixedDepositModule)
},
{
  path: "loan-receivables",
  loadChildren: () =>
  import("./loan-receivables/loan-receivables.module").then((m) => m.LoanReceivablesModule)
 },
 {
  path: "loan-otherdebits",
  loadChildren: () =>
  import("./loan-otherdebits/loan-otherdebits.module").then((m) => m.LoanOtherdebitsModule)
 },
 {
  path: "jewellery",
  loadChildren: () =>
  import("./jewellery/jewellery.module").then((m) => m.JewelleryModule)
},
{
  path: "mutualfund",
  loadChildren: () =>
  import("./mutualfund/mutualfund.module").then((m) => m.MutualfundModule)
},
{
  path: "loan-receivables",
  loadChildren: () =>
  import("./loan-receivables/loan-receivables.module").then((m) => m.LoanReceivablesModule)
 },
  {
    path: "property",
    loadChildren: () =>
    import("./property/property.module").then((p) => p.PropertyModule),
  },
  {
    path: "multiple",
    loadChildren: () =>
    import("./widget/widget.module").then((p) => p.WidgetModule),
  },
  {
    path: "prePlanCalendar",
    loadChildren: () =>
    import("./pre-plan-calendar/pre-plan-calendar.module").then((p) => p.PrePlanCalendarModule),
  },
  {
    path: "schedule",
    loadChildren: () =>
    import("./schedulelist/schedulelist.module").then((p) => p.SchedulelistModule),
  },
  {
    path: "knowledge",
    loadChildren: () =>
    import("./knowledge/knowledge.module").then((p) => p.KnowledgeModule),
  },
  
  {
    path: "notepad",
    loadChildren: () =>
    import("./notepad/notepad.module").then((p) => p.NotepadModule),
  },
  
  {
    path: "financial",
    loadChildren: () =>
    import("./financial-year/financial-year.module").then((p) => p.FinancialYearModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
