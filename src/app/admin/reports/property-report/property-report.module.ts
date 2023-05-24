import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator/paginator-module';
import { MatFormFieldModule } from '@angular/material/form-field/form-field-module';
import { MatInputModule } from '@angular/material/input/input-module';
import { MatButtonModule } from '@angular/material/button/button-module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatRadioModule } from '@angular/material/radio/radio-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip/tooltip-module';
import { MatTableExporterModule } from 'mat-table-exporter/lib/mat-table-exporter.module';
import { MatCheckboxModule } from '@angular/material/checkbox/checkbox-module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon/icon-module';
import { MatDialogModule } from '@angular/material/dialog/dialog-module';
import { MatSortModule } from '@angular/material/sort/sort-module';
import { MatMenuModule } from '@angular/material/menu/menu-module';
import { MatToolbarModule } from '@angular/material/toolbar/toolbar-module';
import { PropertyReportComponent } from './property-report/property-report.component';
import { PropertyReportRoutingModule } from './property-report-routing.module';


@NgModule({
  declarations: [
    PropertyReportComponent
  ],
  imports: [
    CommonModule,
    PropertyReportRoutingModule,
    ComponentsModule,
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
    MatRadioModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatAutocompleteModule
  ]
})
export class PropertyReportModule { }
