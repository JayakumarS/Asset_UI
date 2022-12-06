import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaddataRoutingModule } from './loaddata-routing.module';
import { AddLoadComponent } from './add-load/add-load.component';


@NgModule({
  declarations: [
    AddLoadComponent
  ],
  imports: [
    CommonModule,
    LoaddataRoutingModule
  ]
})
export class LoaddataModule { }
