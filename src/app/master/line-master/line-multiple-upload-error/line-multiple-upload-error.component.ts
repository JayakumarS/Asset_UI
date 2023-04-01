import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BrandMasterService } from '../../brand/brand.service';
import { LineMasterService } from '../line-master.service';
import { LineUploadSuccessPopupComponent } from '../line-upload-success-popup/line-upload-success-popup.component';

@Component({
  selector: 'app-line-multiple-upload-error',
  templateUrl: './line-multiple-upload-error.component.html',
  styleUrls: ['./line-multiple-upload-error.component.sass']
})
export class LineMultipleUploadErrorComponent implements OnInit {
  userGroup:[]
  docForm: FormGroup;
  companyId:any;
  itemList:any;
  
  isValid: boolean=true;
  branchcheck: boolean=true;
  isBranchValid: boolean=true;


  constructor(
    public router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private serverUrl:serverLocations,
    private brandService : BrandMasterService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    public lineMasterService: LineMasterService,
    @Inject(MAT_DIALOG_DATA) public values: any,
    public dialogRef: MatDialogRef<LineMultipleUploadErrorComponent>
  ) {
    this.docForm = this.fb.group({
        lineCode: [""],
        lineDescription:[""],
        branchCode:[""],
     
    });

  }

  ngOnInit(): void {
    this.itemList=this.values.itemLineMasterList;
    console.log(this.itemList);
    for(let i = 0;i<this.itemList.length;i++){
      if(this.itemList[i].isValid == false){
        this.isValid = false;
      } if(this.itemList[i].branchcheck == false){
        this.branchcheck = false;
      }if(this.itemList[i].isBranchValid == false){
        this.isBranchValid = false;
      }
  
  }
  }
   onSubmit(){
    this.itemList=this.values.itemLineMasterList;
    this.lineMasterService.addMultiple(this.itemList).subscribe({
      next:(data) => {
       if(data.message =='Success'){
              let tempDirection;
              if (localStorage.getItem("isRtl") === "true") {
              tempDirection = "rtl";
              } else {
             tempDirection = "ltr";
             }
              const dialogRef = this.dialog.open(LineUploadSuccessPopupComponent, {
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