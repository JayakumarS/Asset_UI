import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferAssetRoutingModule } from './transfer-asset-routing.module';
import { AddTransferComponent } from './add-transfer/add-transfer.component';
import { ListTransferComponent } from './list-transfer/list-transfer.component';
import { DeleteTransferComponent } from './list-transfer/delete-transfer/delete-transfer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ViewTransferAssetComponent } from './view-transfer-asset/view-transfer-asset.component';


@NgModule({
  declarations: [
    AddTransferComponent,
    ListTransferComponent,
    DeleteTransferComponent,
    ViewTransferAssetComponent
  ],
  imports: [
    CommonModule,
    TransferAssetRoutingModule,
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
  ] ,
  providers: [NotificationService],
})
export class TransferAssetModule { }
