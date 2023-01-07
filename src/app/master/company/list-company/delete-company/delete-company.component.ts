import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.sass']
})
export class DeleteCompanyComponent {

  constructor(public dialogRef: MatDialogRef<DeleteCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public departmentMasterService: CompanyService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' });
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true });
    }

}
