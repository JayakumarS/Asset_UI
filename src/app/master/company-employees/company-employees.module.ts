import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyEmployeesRoutingModule } from './company-employees-routing.module';

import { AddCompanyEmployeesComponent } from './add-company-employees/add-company-employees.component';
import { ListCompanyEmployeesComponent } from './list-company-employees/list-company-employees.component';
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
import { DeleteCompanyEmpComponent } from './list-company-employees/delete-company-emp/delete-company-emp.component';
import { AddMultiplecompanyEmployeesComponent } from './add-multiplecompany-employees/add-multiplecompany-employees.component';


@NgModule({
  declarations: [
 
    AddCompanyEmployeesComponent,
    ListCompanyEmployeesComponent,
    DeleteCompanyEmpComponent,
    AddMultiplecompanyEmployeesComponent,
    
  ],
  imports: [
    CommonModule,
    CompanyEmployeesRoutingModule,
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
export class CompanyEmployeesModule { }
