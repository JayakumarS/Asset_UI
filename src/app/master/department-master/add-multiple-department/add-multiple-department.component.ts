import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AddMultipleItemComponent } from 'src/app/inventory/item-master/add-multiple-item/add-multiple-item.component';
import { DepartmentMasterService } from '../department-master.service';

@Component({
  selector: 'app-add-multiple-department',
  templateUrl: './add-multiple-department.component.html',
  styleUrls: ['./add-multiple-department.component.sass']
})
export class AddMultipleDepartmentComponent implements OnInit {

  departmentMultipleUpload: FormGroup;
  dialogTitle: string;
  excelFile : any;
  companyId: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public router:Router,
    private snackBar: MatSnackBar,
    public departmentMasterService: DepartmentMasterService,
    private httpService: HttpServiceService,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<AddMultipleItemComponent>
  )
  {
    this.departmentMultipleUpload = this.fb.group({
      uploadfile:  [""],
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),
      'loginedUser': this.tokenStorage.getUserId()

    });
  }

  ngOnInit(): void {
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
    location.reload();
  }


  getCreditFile(event) {
    var docfile = event.target.files[0];
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName",fileExtension);
    this.excelFile = frmData;
    console.log(this.excelFile);

    }


    showNotification(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
     }

     upload(){
      this.companyId=this.tokenStorage.getCompanyId();
      this.httpService.post<any>(this.departmentMasterService.multipleUploadFiles+"?companyId="+this.tokenStorage.getCompanyId()+"&branchId="+this.tokenStorage.getBranchId(),this.excelFile).subscribe(data => {
        console.log(data);

          if(data.message =='Success'){
          this.showNotification(
            "snackbar-success",
            "Records Added Successfully...!!!",
            "bottom",
            "center"
          );
          window.sessionStorage.setItem("makerLogin","");
          this.router.navigate(['/master/department-Master/list-department'])
          window.location.reload();
          } else  if(data.message =='Email Id or Employee Id Already Present'){
            let tempDirection;
            if (localStorage.getItem("isRtl") === "true") {
            tempDirection = "rtl";
            } else {
           tempDirection = "ltr";
           }
            const dialogRef = this.dialog.open(AddMultipleDepartmentComponent, {
              data: data,
              height:"40%",
              width: "640px",
              direction: tempDirection,
            });

        }else if (data.message =='Department Id or Branch Id is not Present in the System'){
          let tempDirection;
            if (localStorage.getItem("isRtl") === "true") {
            tempDirection = "rtl";
            } else {
           tempDirection = "ltr";
           }
            const dialogRef = this.dialog.open(AddMultipleDepartmentComponent, {
              data: data,
              height:"40%",
              width: "640px",
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

        },
        (err: HttpErrorResponse) => {

      });

    }
}
