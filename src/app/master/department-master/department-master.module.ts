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

import { DepartmentMasterRoutingModule } from './department-master-routing.module';
import { AddDepartmentMasterComponent } from './add-department-master/add-department-master.component';
import { ListDepartmentMasterComponent } from './list-department-master/list-department-master.component';
import { DeleteDepartmentComponent } from './list-department-master/delete-department/delete-department.component';
import { AddMultipleDepartmentComponent } from './add-multiple-department/add-multiple-department.component';
import { UploadExcelPopupComponent } from './upload-excel-popup/upload-excel-popup.component';
import { UploadSuccessPopupComponent } from './upload-success-popup/upload-success-popup.component';


@NgModule({
  declarations: [
    AddDepartmentMasterComponent,
    ListDepartmentMasterComponent,
    DeleteDepartmentComponent,
    AddMultipleDepartmentComponent,
    UploadExcelPopupComponent,
    UploadSuccessPopupComponent,
  ],
  imports: [
    CommonModule,
    DepartmentMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
  ]
})
export class DepartmentMasterModule { }
