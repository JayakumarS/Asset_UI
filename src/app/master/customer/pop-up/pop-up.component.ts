import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UploadSuccessPopupComponent } from 'src/app/inventory/item-master/upload-success-popup/upload-success-popup.component';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.sass']
})
export class PopUpComponent implements OnInit {

  isValidUser: boolean=true;
  isValidEmail: boolean=true;
  isValidNum1: boolean=true;
  customerList:any;
  isValid:boolean;

  constructor(
    public router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private serverUrl:serverLocations,
    private  customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public values: any,
    public dialogRef: MatDialogRef<PopUpComponent>
  ) { }

  ngOnInit(): void {
    this.customerList=this.values.customerDetails;
    console.log(this.customerList);
   for(let i = 0;i<this.customerList.length;i++){
    if(this.customerList[i].isValidUser == false){
      this.isValidUser = false;
    }
    if(this.customerList[i].isValidEmail == false){
      this.isValidEmail = false;
    }
  }
  
  //   if(this.itemList[i].isValidNum1 == false){
  //     this.isValidNum1 = false;
  //   }
  //  }
  }

   onSubmit(){
    this.customerList=this.values.customerDetails;
    this.customerService.addMultiple(this.customerList).subscribe({
      next:(data) => {
        if(data.message){
              let tempDirection;
              if (localStorage.getItem("isRtl") === "true") {
              tempDirection = "rtl";
              } else {
             tempDirection = "ltr";
             }
              const dialogRef = this.dialog.open(UploadSuccessPopupComponent, {
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
