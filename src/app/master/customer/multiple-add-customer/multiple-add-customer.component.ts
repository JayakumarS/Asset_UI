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
import { PopUpComponent } from '../pop-up/pop-up.component';

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
        duration: 1000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    showNotification1(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    showNotification2(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    showNotification3(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    showNotification4(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }
    showNotification5(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }
    showNotification6(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    showNotification7(colorName, text, placementFrom, placementAlign) {
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
        let tempDirection;
        if (localStorage.getItem("isRtl") === "true") {
        tempDirection = "rtl";
        } else {
       tempDirection = "ltr";
       }
        const dialogRef = this.dialog.open(PopUpComponent, {
          data: data,
          height:"80%",
          width: "100%",
          direction: tempDirection,
        });       
    },
       
      //   if(data.success ==true){
      //     this.showNotification(
      //       "snackbar-success",
      //       "Records Added Successfully...!!!",
      //       "bottom",
      //       "center"
      //     );
      //     location.reload()
      //     this.router.navigate(['/master/customer/list-customer'])
      //    }
      //     else if(data.message!=null || data.message!=""){
      //     this.showNotification5(
      //       "snackbar-danger",
      //       data.message ,
      //       "bottom",
      //       "center"
      //       );
      //    }


      //    else if(data.success ==false){
      //     this.showNotification6(
      //       "snackbar-danger",
      //      "Not Added!!",
      //       "bottom",
      //       "center"
      //       );
      //    }
         
      //   if(data.postalvalid ==false){
      //     this.showNotification1(
      //       "snackbar-danger",
      //      "PIN CODE Should contain only of 6 Letters.",
      //       "top",
      //       "center"
      //       );
      //    }

      // if(data.phonevalid ==false){
      //     this.showNotification2(
      //       "snackbar-danger",
      //      "Phone No Should contain Minimum of 10 Letters Only !",
      //       "top",
      //       "left"
      //       );
      //    } 
      //    if(data.panvalid ==false){
      //     this.showNotification3(
      //       "snackbar-danger",
      //      "Please Enter Valid PAN NO.",
      //       "top",
      //       "right"
      //       );
      //    }
      //    if(data.gstvalid ==false){
      //     this.showNotification4(
      //       "snackbar-danger",
      //      "Please Enter Valid GST NO.",
      //       "bottom",
      //       "center"
      //       );
      //    }
      //    if(data.emailvalid ==false){
      //     this.showNotification7(
      //       "snackbar-danger",
      //      "Please Enter Valid Email.",
      //       "bottom",
      //       "center"
      //       );
      //    }
         
        
      
        (err: HttpErrorResponse) => {
          
      });

    }



}
