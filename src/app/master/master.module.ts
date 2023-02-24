import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MasterRoutingModule } from './master-routing.module';
import { ListCurrencyMasterComponent } from 'src/app/master/currency-master/list-currency-master/list-currency-master.component';
import { AddCurrencyMasterComponent } from './currency-master/add-currency-master/add-currency-master.component';
import { CountryMasterModule } from './country-master/country-master.module';
import { DesignationMasterModule } from './Activity-Master/designation-master.module';
import { ListDesingnationMasterComponent } from 'src/app/master/Activity-Master/list-desingnation-master/list-desingnation-master.component';
import { ListStatusMasterComponent } from './status/list-status-master/list-status-master.component';
import { AddStatusMasterComponent } from './status/add-status-master/add-status-master.component';
import { AddTaxMasterComponent } from './Tax/add-tax-master/add-tax-master.component';
import { ListTaxMasterComponent } from './Tax/list-tax-master/list-tax-master.component';
import { ListCompanyLogoComponent } from './company-logo/list-company-logo/list-company-logo.component';


@NgModule({
  declarations: [
    ListCurrencyMasterComponent,
    AddCurrencyMasterComponent,
    ListStatusMasterComponent,
    AddStatusMasterComponent,
    AddTaxMasterComponent,
    ListTaxMasterComponent,
    ListCompanyLogoComponent,
  

  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    CountryMasterModule,
    DesignationMasterModule,
  ]
})
export class MasterModule { }
