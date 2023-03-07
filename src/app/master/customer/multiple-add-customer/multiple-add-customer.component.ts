import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CustomerService } from '../customer.service';
import { ErrorUploadComponent } from '../error-upload/error-upload.component';

@Component({
  selector: 'app-multiple-add-customer',
  templateUrl: './multiple-add-customer.component.html',
  styleUrls: ['./multiple-add-customer.component.sass']
})
export class MultipleAddCustomerComponent implements OnInit {
  employeemultipleuploadForm: FormGroup;
  dialogTitle: string;
  excelFile : any;
  companyId: string;

  constructor(private fb: FormBuilder,public dialog: MatDialog,public router:Router,private snackBar: MatSnackBar,private  customerService: CustomerService,private httpService: HttpServiceService,
    private tokenStorage: TokenStorageService,public dialogRef: MatDialogRef<MultipleAddCustomerComponent>) {
      this.employeemultipleuploadForm = this.fb.group({

      uploadfile:  [""],
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),

    }); }

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
      this.httpService.post<any>(this.customerService.multipleEmployeeUploadFiles+"?companyId="+this.tokenStorage.getCompanyId()+"&branchId="+this.tokenStorage.getBranchId(),this.excelFile).subscribe(data => {
        console.log(data);
       
        if(data.success ==true){
          this.showNotification(
            "snackbar-success",
            "Records Added Successfully...!!!",
            "bottom",
            "center"
          );
          location.reload()
          this.router.navigate(['/master/customer/list-customer'])
         }else if(data.success ==false){
          this.showNotification(
            "snackbar-danger",
           "Auditor Name Already Exits..!!",
            "bottom",
            "center"
            );
         }
         else{
          this.showNotification(
            "snackbar-danger",
            data.message ,
            "bottom",
            "center"
            );
         }
         //else  if{
          //(data.message =='Email Id or Employee Id Already Present'){
        //     let tempDirection;
        //     if (localStorage.getItem("isRtl") === "true") {
        //     tempDirection = "rtl";
        //     } else {
        //    tempDirection = "ltr";
        //    }
        //     const dialogRef = this.dialog.open(ErrorUploadComponent, {
        //       data: data,
        //       height:"40%",
        //       width: "640px",
        //       direction: tempDirection,
        //     });
            
        // }else if (data.message =='Department Id or Branch Id is not Present in the System'){
        //   let tempDirection;
        //     if (localStorage.getItem("isRtl") === "true") {
        //     tempDirection = "rtl";
        //     } else {
        //    tempDirection = "ltr";
        //    }
        //     const dialogRef = this.dialog.open(ErrorUploadComponent, {
        //       data: data,
        //       height:"40%",
        //       width: "640px",
        //       direction: tempDirection,
        //     });
        // }
        // else{
        //   this.showNotification(
        //     "snackbar-danger",
        //     "Records Not Added...!!!",
        //     "bottom",
        //     "center"
        //   );
  
          
        // }
        
        },
        (err: HttpErrorResponse) => {
          
      });

    }



}
