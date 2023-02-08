import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
// import { MatDialogModule } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { NotificationService } from "src/app/core/service/notification.service";
import {MatRadioModule} from '@angular/material/radio';

import { ItemMasterRoutingModule } from './item-master-routing.module';
import { AddItemMasterComponent } from './add-item-master/add-item-master.component';
import { ListItemMasterComponent } from './list-item-master/list-item-master.component';
import { DeleteItemMasterComponent } from './list-item-master/delete-item-master/delete-item-master.component';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
    AddItemMasterComponent,
    ListItemMasterComponent,
    DeleteItemMasterComponent,
  ],
  providers: [
    NotificationService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    // MatDialogModule,
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
    ItemMasterRoutingModule,
    ComponentsModule,
    SharedModule,
    MatDialogModule,
    MatRadioModule

  ]
})
export class ItemMasterModule { }
