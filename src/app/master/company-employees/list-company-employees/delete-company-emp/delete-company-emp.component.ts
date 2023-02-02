import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyEmployeeService } from '../../company-employees.service';

@Component({
  selector: 'app-delete-company-emp',
  templateUrl: './delete-company-emp.component.html',
  styleUrls: ['./delete-company-emp.component.sass']
})
export class DeleteCompanyEmpComponent implements OnInit {

 
 
  constructor(public dialogRef: MatDialogRef<DeleteCompanyEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public   companyEmployeeService: CompanyEmployeeService ) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true })
        }

  ngOnInit(): void {
  }
}
