import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CompanyEmployeeService } from '../company-employees.service';
import { CompanyemployeeUploadErrorComponent } from '../companyemployee-upload-error/companyemployee-upload-error.component';

@Component({
  selector: 'app-company-employee-upload-popup',
  templateUrl: './company-employee-upload-popup.component.html',
  styleUrls: ['./company-employee-upload-popup.component.sass']
})
export class CompanyEmployeeUploadPopupComponent implements OnInit {

  userGroup:[]
  docForm: FormGroup;
  companyId:any;
  companyEmpList:any;
  isValid: boolean=true;
  isValidNum: boolean=true;
  isValidEmpId: boolean=true;
  isValidDept: boolean=true;
  constructor(
    public router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private httpService: HttpServiceService,
    private  companyEmployeeService: CompanyEmployeeService,
    @Inject(MAT_DIALOG_DATA) public values: any,
    public dialogRef: MatDialogRef<CompanyEmployeeUploadPopupComponent>
  ) {
    

  }

  ngOnInit(): void {
    this.companyEmpList=this.values.companyEmoloyeeDetails;
    console.log(this.companyEmpList);
   for(let i = 0;i<this.companyEmpList.length;i++){
    if(this.companyEmpList[i].isValid == false){
      this.isValid = false;
    }
    if(this.companyEmpList[i].isValidNum == false){
      this.isValidNum = false;
    }
    if(this.companyEmpList[i].isValidEmpId == false){
      this.isValidEmpId = false;
    }
    if(this.companyEmpList[i].isValidDept == false){
      this.isValidDept = false;
    }
   }
  }

   onSubmit(){
    this.companyEmpList=this.values.companyEmoloyeeDetails;
    this.companyEmployeeService.addMultiple(this.companyEmpList).subscribe({
      next:(data) => {
        if(data.message){
              let tempDirection;
              if (localStorage.getItem("isRtl") === "true") {
              tempDirection = "rtl";
              } else {
             tempDirection = "ltr";
             }
              const dialogRef = this.dialog.open(CompanyemployeeUploadErrorComponent, {
                data: data,
                height:"31%",
                width: "450px",
                direction: tempDirection,
              });
            }
          else{
            this.showNotification(
              "snackbar-danger",
              "Records Not Added...!!!",
              "bottom",
              "center"
            );


          }
      }
    })
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

   onNoClick(){
    this.dialogRef.close();
    location.reload();
  }

}
