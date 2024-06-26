import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { AddreportsComponent } from './addreports/addreports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddDepreciationReportComponent } from './add-depreciation-report/add-depreciation-report.component';
import { AddAuditReportComponent } from './add-audit-report/add-audit-report.component';
import { AssetsReturnComponent } from './assets-return/assets-return.component';
import { DiscardAssetsComponent } from './discard-assets/discard-assets.component';
import { UserLogComponent } from './user-log/user-log.component';
import { AddreportLocationComponent } from './addreports/addreport-location/addreport-location.component';
import { ListAssetHistoryReportComponent } from './list-asset-history-report/list-asset-history-report.component';
// Pagination
import { NgxPaginationModule } from 'ngx-pagination'
import { ListAuditLogComponent } from './audit-log/list-audit-log/list-audit-log.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IndividualInformationComponent } from 'src/app/master/widget/individual-information/individual-information.component';
import { AddreportItemComponent } from './addreports/addreport-item/addreport-item.component';
// import { VehicleReportComponent } from './vehicle-report/vehicle-report.component';

@NgModule({
  declarations: [
    AddreportsComponent,
    AddDepreciationReportComponent,
    AddAuditReportComponent,
    AssetsReturnComponent,
    DiscardAssetsComponent,
    UserLogComponent,
    AddreportLocationComponent,
    ListAssetHistoryReportComponent,
    ListAuditLogComponent,
    AddreportItemComponent,
    // VehicleReportComponent,

  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
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
    NgxPaginationModule,
    MatPaginatorModule,
    MatAutocompleteModule
    
  ]
})
export class ReportsModule { }
