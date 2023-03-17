import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineMasterRoutingModule } from './line-master-routing.module';
import { AddLineMasterComponent } from './add-line-master/add-line-master.component';
import { ListLineMasterComponent } from './list-line-master/list-line-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LineMultipleUploadErrorComponent } from './line-multiple-upload-error/line-multiple-upload-error.component';
import { LineUploadSuccessPopupComponent } from './line-upload-success-popup/line-upload-success-popup.component';
import { LineMultipleUploadComponent } from './line-multiple-upload/line-multiple-upload.component';


@NgModule({
  declarations: [
    AddLineMasterComponent,
    ListLineMasterComponent,
    LineMultipleUploadErrorComponent,
    LineUploadSuccessPopupComponent,
    LineMultipleUploadComponent
  ],
  imports: [
    CommonModule,
    LineMasterRoutingModule,
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
    SharedModule
  ]
})
export class LineMasterModule { }
