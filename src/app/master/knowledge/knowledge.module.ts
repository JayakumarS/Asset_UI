	
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { KnowledgeRoutingModule } from './knowledge-routing.module';
import { KnowledgeBankComponent } from './knowledge-bank/knowledge-bank.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { KnowledgeDeleteComponent } from './knowledge-bank/knowledge-delete/knowledge-delete.component';



@NgModule({
  declarations: [
    KnowledgeBankComponent,
    KnowledgeDeleteComponent
  ],
  imports: [
    CommonModule,
    KnowledgeRoutingModule,
    CommonModule,
    PerfectScrollbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSnackBarModule,
    DragDropModule,
    FormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSortModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatRadioModule,
    ComponentsModule,
    SharedModule,
    MatTableExporterModule,
    TranslateModule,

  ], 
 
})
export class KnowledgeModule { }