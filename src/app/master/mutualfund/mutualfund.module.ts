import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MutualfundRoutingModule } from './mutualfund-routing.module';
import { AddFundComponent } from './add-fund/add-fund.component';
import { ListFundComponent } from './list-fund/list-fund.component';
import { ComponentsModule } from "../../shared/components/components.module";
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
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteFundComponent } from './list-fund/delete-fund/delete-fund.component';
import { MatRadioModule } from '@angular/material/radio';
@NgModule({
    declarations: [
        AddFundComponent,
        ListFundComponent,
        DeleteFundComponent
    ],
    imports: [
        CommonModule,
        MutualfundRoutingModule,
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
    MatRadioModule
    ]
})
export class MutualfundModule { }
