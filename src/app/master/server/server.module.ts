import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule } from './server-routing.module';
import { AddServerComponent } from './add-server/add-server.component';
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
import { ListServerComponent } from './list-server/list-server.component';
import { DeleteServerComponent } from './list-server/delete-server/delete-server.component';
import { ViewServerComponent } from './view-server/view-server.component';




@NgModule({
  declarations: [
    AddServerComponent,
    ListServerComponent,
    DeleteServerComponent,
    ViewServerComponent
  ],
  providers:[
    NotificationService
  ],
  imports: [
        CommonModule,
        ServerRoutingModule,
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
export class ServerModule { }
