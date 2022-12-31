import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MasterRoutingModule } from './master-routing.module';
import { ListCurrencyMasterComponent } from 'src/app/master/currency-master/list-currency-master/list-currency-master.component';
import { AddCurrencyMasterComponent } from './currency-master/add-currency-master/add-currency-master.component';
import { CountryMasterModule } from './country-master/country-master.module';
import { DesignationMasterModule } from './Activity-Master/designation-master.module';
import { ListDesingnationMasterComponent } from 'src/app/master/Activity-Master/list-desingnation-master/list-desingnation-master.component';

@NgModule({
  declarations: [
    ListCurrencyMasterComponent,
    AddCurrencyMasterComponent,
 
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    CountryMasterModule,
    DesignationMasterModule,
  ]
})
export class MasterModule { }
