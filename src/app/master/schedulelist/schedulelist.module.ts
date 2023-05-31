import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgApexchartsModule } from "ng-apexcharts";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { CurrencyPipe } from '@angular/common';

import { NotificationService } from "src/app/core/service/notification.service";

// highcharts
import { HighchartsChartModule } from 'highcharts-angular';
// Pagination
import { NgxPaginationModule } from 'ngx-pagination';


import { SchedulelistRoutingModule } from './schedulelist-routing.module';
import { AddSchedulelistComponent } from './add-schedulelist/add-schedulelist.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule({
  declarations: [
    AddSchedulelistComponent
  ],
  imports: [
    CommonModule,
    SchedulelistRoutingModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    ComponentsModule,
    SharedModule,
    MatTableExporterModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    MatAutocompleteModule,
    MatMenuModule,
    HighchartsChartModule,
    NgxPaginationModule
    
  ],
  providers: [NotificationService,CurrencyPipe],
})
  

export class SchedulelistModule { }
