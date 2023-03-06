import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMasterRoutingModule } from './user-master-routing.module';
import { AddUserMasterComponent } from './add-user-master/add-user-master.component';
import { ListUserMasterComponent } from './list-user-master/list-user-master.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { DeleteUserMasterComponent } from './list-user-master/delete-user-master/delete-user-master.component';
import { AddMultipleUserComponent } from './add-multiple-user/add-multiple-user.component';
import { AddMultipleUserErrorComponent } from './add-multiple-user-error/add-multiple-user-error.component';

@NgModule({
  declarations: [
    AddUserMasterComponent,
    ListUserMasterComponent,
    DeleteUserMasterComponent,
    AddMultipleUserComponent,
    AddMultipleUserErrorComponent
  ],
  imports: [
    CommonModule,
    UserMasterRoutingModule,
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
export class UserMasterModule { }
