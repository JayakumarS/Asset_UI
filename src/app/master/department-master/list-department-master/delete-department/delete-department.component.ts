import { Component, Inject , OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DepartmentMasterService } from '../../department-master.service';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.sass']
})
export class DeleteDepartmentComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public departmentMasterService: DepartmentMasterService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.departmentMasterService.departmentDelete(this.data.deptCode);
    }

}
