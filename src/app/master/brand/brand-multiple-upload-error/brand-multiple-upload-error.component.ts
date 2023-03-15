import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BrandUploadSuccessPopupComponent } from '../brand-upload-success-popup/brand-upload-success-popup.component';
import { BrandMasterService } from '../brand.service';

@Component({
  selector: 'app-brand-multiple-upload-error',
  templateUrl: './brand-multiple-upload-error.component.html',
  styleUrls: ['./brand-multiple-upload-error.component.sass']
})
export class BrandMultipleUploadErrorComponent implements OnInit {
  userGroup:[]
  docForm: FormGroup;
  companyId:any;
  itemBrand:any;
  
  isValid: boolean=true;
  brandcheck: boolean=true;


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
    public BrandService: BrandMasterService,
    @Inject(MAT_DIALOG_DATA) public values: any,
    public dialogRef: MatDialogRef<BrandMultipleUploadErrorComponent>
  ) {
    this.docForm = this.fb.group({
      brand: [""],
      description: [""],
     
    });

  }

  ngOnInit(): void {
    this.itemBrand=this.values.itembrandMasterList;
    console.log(this.itemBrand);
    for(let i = 0;i<this.itemBrand.length;i++){
      if(this.itemBrand[i].isValid == false){
        this.isValid = false;
      } if(this.itemBrand[i].brandcheck == false){
        this.brandcheck = false;
      }
  
  }
  }
   onSubmit(){
    this.itemBrand=this.values.itembrandMasterList;
    this.brandService.addMultiple(this.itemBrand).subscribe({
      next:(data) => {
       if(data.message =='Success'){
              let tempDirection;
              if (localStorage.getItem("isRtl") === "true") {
              tempDirection = "rtl";
              } else {
             tempDirection = "ltr";
             }
              const dialogRef = this.dialog.open(BrandUploadSuccessPopupComponent, {
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

