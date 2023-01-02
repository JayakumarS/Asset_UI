import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { ListVendorComponent } from './list-vendor/list-vendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteVendorComponent } from './list-vendor/delete/delete.component';


@NgModule({
  declarations: [
    AddVendorComponent,
    ListVendorComponent,
    DeleteVendorComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
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
export class VendorModule { }
