import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, ExcelUploadComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent,ExcelUploadComponent, BreadcrumbComponent],
})
export class ComponentsModule {}
