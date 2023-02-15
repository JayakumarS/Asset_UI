import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRecieptsRoutingModule } from './bank-reciepts-routing.module';
import { AddBankRecieptsComponent } from './add-bank-reciepts/add-bank-reciepts.component';
import { ListBankRecieptsComponent } from './list-bank-reciepts/list-bank-reciepts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatCommonModule } from '@angular/material/core';
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
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddBankRecieptsComponent,
    ListBankRecieptsComponent
  ],
  imports: [
    CommonModule,
    BankRecieptsRoutingModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTableExporterModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    NgbCarouselModule,
    MatCommonModule,
    MatMenuModule,
    MatCardModule,
    
  ]
})
export class BankRecieptsModule { }
