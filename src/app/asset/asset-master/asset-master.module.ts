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
import { AssetMasterRoutingModule } from './asset-master-routing.module';
import { ListAssetMasterComponent } from './list-asset-master/list-asset-master.component';
import { DeleteAssetMasterComponent } from './list-asset-master/delete-asset-master/delete-asset-master.component';
import { AddAssetMasterComponent } from './add-asset-master/add-asset-master.component';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AddMultipleAssetMasterComponent } from './add-multiple-asset-master/add-multiple-asset-master.component';
import { AssetProfileViewComponent } from './asset-profile-view/asset-profile-view.component';

import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgApexchartsModule } from "ng-apexcharts";
import { UploadErrorComponent } from './upload-error/upload-error.component';
import { UploadExcelPopupComponent } from './upload-excel-popup/upload-excel-popup.component';
import { UploadSuccessPopupComponent } from './upload-success-popup/upload-success-popup.component';


@NgModule({
  declarations: [
    ListAssetMasterComponent,
    DeleteAssetMasterComponent,
    AddAssetMasterComponent,
    AddMultipleAssetMasterComponent,
    AssetProfileViewComponent,
    UploadErrorComponent,
    UploadExcelPopupComponent,
    UploadSuccessPopupComponent
  ],
  providers:[
    NotificationService
  ],
  imports: [
    CommonModule,
    AssetMasterRoutingModule,
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
    MatTooltipModule
  ]
})
export class AssetMasterModule { }
