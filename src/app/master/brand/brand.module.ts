import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { ListBrandComponent } from './list-brand/list-brand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteBranchComponent } from './list-brand/delete-branch/delete-branch.component';
import { MultipleUploadBrandComponent } from './multiple-upload-brand/multiple-upload-brand.component';
import { BrandMultipleUploadErrorComponent } from './brand-multiple-upload-error/brand-multiple-upload-error.component';
import { BrandUploadSuccessPopupComponent } from './brand-upload-success-popup/brand-upload-success-popup.component';


@NgModule({
  declarations: [
    AddBrandComponent,
    ListBrandComponent,
    DeleteBranchComponent,
    MultipleUploadBrandComponent,
    BrandMultipleUploadErrorComponent,
    BrandUploadSuccessPopupComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
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
export class BrandModule { }
