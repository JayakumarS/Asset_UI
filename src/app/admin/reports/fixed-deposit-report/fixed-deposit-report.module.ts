
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedDepositReportRoutingModule } from './fixed-deposit-report-routing.module';
import { FixedDepositReportsComponent } from './fixed-deposit-reports/fixed-deposit-reports.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
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

// Pagination
import { NgxPaginationModule } from 'ngx-pagination'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
    declarations: [
      FixedDepositReportsComponent
    ],
    imports: [
        CommonModule,
        FixedDepositReportRoutingModule,
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
        MatAutocompleteModule,
        MatExpansionModule,
        
    ]
})
export class FixedDepositReportModule { }
