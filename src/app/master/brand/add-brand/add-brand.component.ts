import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Brand } from '../brand.model';
import { BrandMasterService } from '../brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.sass']
})
export class AddBrandComponent implements OnInit {
  [x: string]: any;
  docForm: FormGroup

  edit:boolean=false;
  requestId: any;
  brand: Brand;
 

  constructor(private fb: FormBuilder,
   
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private   brandMasterService: BrandMasterService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,private tokenStorage: TokenStorageService,
    private notificationService: NotificationService) { 
  this.docForm = this.fb.group({
    brand: [""],
    Description: [""],
     isactive:[""],
     loginedUser:[this.tokenStorage.getUserId()],
     companyId:[this.tokenStorage.getCompanyId()],
     brand_id: [""],
  });
}
  ngOnInit(): void {
    this.docForm = this.fb.group({
      brand: [""],
      Description: [""],
       isactive:[true],
       loginedUser:[this.tokenStorage.getUserId()],
       companyId:[this.tokenStorage.getCompanyId()],
       brand_id: [""],

      

    });

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;



      }
     });
  

  }
  fetchDetails(brand_id: any) {
    const obj = {
       brand_id
    }
    this.brandMasterService.edit(obj).subscribe({
      next: (res: any) => {
        this.docForm.patchValue({
          'brand':res.brandMasterBean.brand,
          'Description': res.brandMasterBean.Description,
          'isactive': res.brandMasterBean.isactive,
          'loginedUser': res.brandMasterBean.loginedUser,
          'brand_id': res.brandMasterBean.brand_id
        })
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
  }
  update(){
  if(this.docForm.valid){
    this.brand = this.docForm.value;
    this.brand.id= this.requestId;
    this.brandMasterService.updateMaster(this.brand).subscribe({
      next: (data) => {
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Updated Successfully",
            "bottom",
            "center"
          );
          this.onCancel();
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Updated Successfully...!!!",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          error.message + "...!!!",
          "bottom",
          "center"
        );
      }
    });
  }else{
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right"
    );
  }
  }
  onSubmit(){
    if(this.docForm.valid){
      this.docForm.value.loginedUser = this.tokenStorage.getUserId();
    this.brand = this.docForm.value;
    console.log(this.brand);

    this.brandMasterService.addbrand(this.brand);
     this.showNotification(
       "snackbar-success",
       "Successfully Added...!!!",
       "bottom",
       "center"
     );
     this.onCancel();
     }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }

     
  }

  reset(){
    if (!this.edit) {
      location.reload()
    this.docForm = this.fb.group({
      brand: [""],
      Description: [""],
      isactive:[true],
      loginedUser:[this.tokenStorage.getUserId()]

    });
  }else {
    this.fetchDetails(this.requestId);
  }
  }
  onCancel(){
    this.router.navigate(['/master/brand/listBrand']);
  }

  keyPressName(event: any) {
    const pattern = /[A-Z,a-z,' ']/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}

