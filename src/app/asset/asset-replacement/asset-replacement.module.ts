import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgApexchartsModule } from "ng-apexcharts";
import { AddAssetReplacementComponent } from './add-asset-replacement/add-asset-replacement.component';
import { ListAssetReplacementComponent } from './list-asset-replacement/list-asset-replacement.component';
import { AssetReplacementRoutingModule } from './asset-replacement-routing.module';



@NgModule({
  declarations: [
    AddAssetReplacementComponent,
    ListAssetReplacementComponent,
  ],
  providers:[NotificationService],
  imports: [
    CommonModule,
    AssetReplacementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
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
    MatRadioModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
  ]
})
export class AssetReplacementModule { }
