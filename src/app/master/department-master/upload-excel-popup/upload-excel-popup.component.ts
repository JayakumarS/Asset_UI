import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UsergroupService } from 'src/app/master/usergroup/usergroup.service';
import { DepartmentMasterService } from '../department-master.service';
import { UploadSuccessPopupComponent } from '../upload-success-popup/upload-success-popup.component';

@Component({
  selector: 'app-upload-excel-popup',
  templateUrl: './upload-excel-popup.component.html',
  styleUrls: ['./upload-excel-popup.component.sass']
})
export class UploadExcelPopupComponent implements OnInit {

  
  userGroup:[]
  docForm: FormGroup;
  companyId:any;
  departmentList:any;
  isValid: boolean=true;
  isValidNum: boolean=true;
  isValidNum1: boolean=true;
  isValidEmail: boolean=true;
  isValidName: boolean=true;
  deptcodevaild: boolean=true;
  isValidBranch: boolean=true; 
  constructor(
    public router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private serverUrl:serverLocations,
    private usergroupService : UsergroupService,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    public departmentMasterService: DepartmentMasterService,
    @Inject(MAT_DIALOG_DATA) public values: any,
    public dialogRef: MatDialogRef<UploadExcelPopupComponent>
  ) {
    this.docForm = this.fb.group({
      departmentCode:[""],
      departmentName:[""],
      description:[""],
      departmentHead:[""],
    });

  }

  ngOnInit(): void {
    this.departmentList=this.values.departmentMasterList;
    console.log(this.departmentList);
    for(let i = 0;i<this.departmentList.length;i++){
      if(this.departmentList[i].isValidEmail == false){
        this.isValidEmail = false;
      }
      if(this.departmentList[i].isValid == false){
        this.isValid = false;
      }
      if(this.departmentList[i].isValidName == false){
        this.isValidName = false;
      }
      if(this.departmentList[i].deptcodevaild == false){
        this.deptcodevaild = false;
        
      }
      if(this.departmentList[i].isValidBranch == false){
        this.isValidBranch = false;
        
      }
      
    }
  }

   onSubmit(){
    this.departmentList=this.values.departmentMasterList;
    this.departmentMasterService.addMultiple(this.departmentList).subscribe({
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
