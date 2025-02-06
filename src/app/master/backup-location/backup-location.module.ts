import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackupLocationRoutingModule } from './backup-location-routing.module';
import { AddBackupLocationComponent } from './add-backup-location/add-backup-location.component';
import { ListBackupLocationComponent } from './list-backup-location/list-backup-location.component';
import { ViewBackupLocationComponent } from './view-backup-location/view-backup-location.component';
import { DeleteBackupLocationComponent } from './list-backup-location/delete-backup-location/delete-backup-location.component';
import { ComponentsModule } from "../../shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
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
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { NotificationService } from 'src/app/core/service/notification.service';


@NgModule({
  declarations: [
    AddBackupLocationComponent,
    ListBackupLocationComponent,
    ViewBackupLocationComponent,
    DeleteBackupLocationComponent
  ],
  providers:[
    NotificationService
  ],
  imports: [
    CommonModule,
    BackupLocationRoutingModule,
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
  ]
})
export class BackupLocationModule { }
