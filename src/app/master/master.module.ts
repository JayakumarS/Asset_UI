import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MasterRoutingModule } from './master-routing.module';
import { ListCurrencyMasterComponent } from 'src/app/master/currency-master/list-currency-master/list-currency-master.component';
import { AddCurrencyMasterComponent } from './currency-master/add-currency-master/add-currency-master.component';
import { CountryMasterModule } from './country-master/country-master.module';
import { DesignationMasterModule } from './Activity-Master/designation-master.module';
import { ListDesingnationMasterComponent } from 'src/app/master/Activity-Master/list-desingnation-master/list-desingnation-master.component';
import { ListStatusMasterComponent } from './status/list-status-master/list-status-master.component';
import { AddTaxMasterComponent } from './Tax/add-tax-master/add-tax-master.component';
import { ListTaxMasterComponent } from './Tax/list-tax-master/list-tax-master.component';
// import { ListCompanyLogoComponent } from './company-logo/list-company-logo/list-company-logo.component';
import { AddLineMasterComponent } from './line-master/add-line-master/add-line-master.component';
import { ListLineMasterComponent } from './line-master/list-line-master/list-line-master.component';

import { AddExchangeMasterComponent } from './Exchange/add-exchange-master/add-exchange-master.component';
import { ListExchangeMasterComponent } from './Exchange/list-exchange-master/list-exchange-master.component';
import { AddConsoleLogComponent } from './console-log/add-console-log/add-console-log.component';
import { DeleteConsoleLogComponent } from './console-log/list-console-log/delete-console-log/delete-console-log.component';
import { KnowledgeBankComponent } from './knowledge/knowledge-bank/knowledge-bank.component';


@NgModule({
  declarations: [
    ListCurrencyMasterComponent,
    AddCurrencyMasterComponent,
    ListStatusMasterComponent,
    AddTaxMasterComponent,
    ListTaxMasterComponent,
   
    AddLineMasterComponent,
    ListLineMasterComponent,
    ListExchangeMasterComponent,
    AddExchangeMasterComponent,
    AddConsoleLogComponent,


  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    CountryMasterModule,
    DesignationMasterModule,
  ]
})
export class MasterModule { }
