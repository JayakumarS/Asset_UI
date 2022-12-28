import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InStockRoutingModule } from './in-stock-routing.module';
import { AddInStockComponent } from './add-in-stock/add-in-stock.component';
import { ListInStockComponent } from './list-in-stock/list-in-stock.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NotificationService } from 'src/app/core/service/notification.service';


@NgModule({
  declarations: [
    AddInStockComponent,
    ListInStockComponent
  ],
  imports: [
    CommonModule,
    InStockRoutingModule,
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
    MatAutocompleteModule
    
    
  ],
  providers: [NotificationService],
})

export class InStockModule { }
