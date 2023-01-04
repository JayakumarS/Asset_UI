import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItSupportRoutingModule } from './it-support-routing.module';
import { AddItSupportComponent } from './add-it-support/add-it-support.component';
import { ListItSupportComponent } from './list-it-support/list-it-support.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { MatCheckboxModule, _MatCheckboxRequiredValidatorModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DeleteitsupportComponent } from './list-it-support/deleteitsupport/deleteitsupport.component';

@NgModule({
  declarations: [
    AddItSupportComponent,
    ListItSupportComponent,
    DeleteitsupportComponent
  ],
  providers:[
    NotificationService
  ],
  imports: [
    CommonModule,
    ItSupportRoutingModule,
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
export class ItSupportModule { }
