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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NotificationService } from "src/app/core/service/notification.service";

import { GrnRoutingModule } from './grn-routing.module';
import { AddGrnComponent } from './add-grn/add-grn.component';
import { ListGrnComponent } from './list-grn/list-grn.component';
import { DeleteGrnComponent } from './list-grn/delete-grn/delete-grn.component';
import { GrnPrintComponent } from './list-grn/grn-print/grn-print.component';


@NgModule({
  declarations: [
    AddGrnComponent,
    ListGrnComponent,
    DeleteGrnComponent,
    GrnPrintComponent
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
    GrnRoutingModule,
    ComponentsModule,
    SharedModule,
    MatAutocompleteModule,
    MatDialogModule
  ]
})
export class GrnModule { }
