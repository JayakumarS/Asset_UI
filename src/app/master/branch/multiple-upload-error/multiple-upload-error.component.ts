import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BranchService } from '../branch.service';
import { UploadSuccessPopupComponent } from '../upload-success-popup/upload-success-popup.component';

@Component({
  selector: 'app-multiple-upload-error',
  templateUrl: './multiple-upload-error.component.html',
  styleUrls: ['./multiple-upload-error.component.sass']
})
export class MultipleUploadErrorComponent implements OnInit {

  userGroup:[]
  docForm: FormGroup;
  companyId:any;
  itemList:any;
  
  isValid: boolean=true;
  deptCodevalid: boolean=true;
  branchHeadvalid:  boolean=true;
  constructor(
    public router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private serverUrl:serverLocations,
    private branchService : BranchService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    public BranchService: BranchService,
    @Inject(MAT_DIALOG_DATA) public values: any,
    public dialogRef: MatDialogRef<MultipleUploadErrorComponent>
  ) {
    this.docForm = this.fb.group({
      branchCode:[""],
      branchname:[""],
      branchHeadList:[""],
     
    });

  }

  ngOnInit(): void {
    this.itemList=this.values.itemMasterList;
    console.log(this.itemList);
   for(let i = 0;i<this.itemList.length;i++){
    if(this.itemList[i].isValid == false){
      this.isValid = false;
    }
    if(this.itemList[i].deptCodevalid == false){
      this.deptCodevalid = false;
    }
    if(this.itemList[i].branchHeadvalid == false){
      this.branchHeadvalid = false;
    }
    
   
   

   }
  }
  // branch code Already Exits.
   onSubmit(){
    this.itemList=this.values.itemMasterList;
    this.branchService.addMultiple(this.itemList).subscribe({
      next:(data) => {
        
        if(data.message =='Success'){
              let tempDirection;
              if (localStorage.getItem("isRtl") === "true") {
              tempDirection = "rtl";
              } else {
             tempDirection = "ltr";
             }
              const dialogRef = this.dialog.open(UploadSuccessPopupComponent, {
                data: data,
                height:"50%",
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

