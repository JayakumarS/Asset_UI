import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { UCategory } from '../uom-model';
import { UomService } from '../uom.service';

@Component({
  selector: 'app-add-uom',
  templateUrl: './add-uom.component.html',
  styleUrls: ['./add-uom.component.sass']
})
export class AddUomComponent implements OnInit {

  docForm: FormGroup;
  uCategory: UCategory;
  requestId:number;
  dialogData: any;
  edit: boolean = false;
  companyId: any;
  branchId: any;


  constructor(private fb: FormBuilder, public router: Router, private snackBar: MatSnackBar,
    public uomService: UomService,
    public commonService: CommonService,  private spinner: NgxSpinnerService,
    public route: ActivatedRoute, private httpService: HttpServiceService,
    public tokenStorage: TokenStorageService,
    )  {
      this.docForm = this.fb.group({
        uomcategoryName: ["", [Validators.required]],
        description: [""],
        uomcategoryCode: ["",[Validators.required]],
        uomcategoryId:[""],
        loginedUser: this.tokenStorage.getUserId(),
        company:this.tokenStorage.getCompanyId(),
        branchname:this.tokenStorage.getBranchId(),
  
      });


     }
    

  ngOnInit(): void {
    this.companyId = this.tokenStorage.getCompanyId();
    console.log(this.companyId)
    this.branchId = this.tokenStorage.getBranchId();
    console.log(this.branchId)
    



    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
    });
  
      }


  onSubmit() {
    if (this.docForm.valid) {
    this.uCategory = this.docForm.value;
    this.uomService.addUomCategory(this.uCategory).subscribe({
      next: (data) => {
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          this.router.navigate(['/inventory/UOM-catagory/list-UOM-Category']);
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Added...!!!",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
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

fetchDetails(uomcategoryId: any): void {
  const obj = {
    editId: uomcategoryId
  }
  this.uomService.editCategory(obj).subscribe({
    next: (res) => {

    this.docForm.patchValue({
      'uomcategoryId': res.uomBean.uomcategoryId,
      'uomcategoryName':res.uomBean.uomcategoryName,
      'uomcategoryCode': res.uomBean.uomcategoryCode,
      'registercode': res.uomBean.registercode,
      'description': res.uomBean.description,

   });
  },

 });


}

keyPressPCB(event: any) {
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
keyPressPCC(event:any){
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 6 && !pattern.test(inputChar)) {
    event.preventDefault();
  }

}
update(){
  if (this.docForm.valid) {
    this.uCategory = this.docForm.value;
    this.spinner.show();
    this.uomService.updateCategory(this.uCategory).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Edit Record Successfully",
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

onCancel(){
  this.router.navigate(['/inventory/UOM-catagory/list-UOM-Category']);


}

keyPressName(event: any) {
  const pattern = /[A-Z,a-z 0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}


 reset(){
  if (!this.edit) {
    this.docForm.reset();
    this.docForm.patchValue({
      'uomcategoryName': '',
      'description': '',
      'uomcategoryCode': '',
      'loginedUser': this.tokenStorage.getUserId()

    })
  } else {
    this.fetchDetails(this.requestId);
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
validateCountry(event) {
  if (event != undefined && event != null && event != "") {
    this.httpService.get<any>(this.commonService.uniqueValidateUrl + "?tableName=" + "country" + "&columnName=" + "country_name" + "&columnValue=" + event).subscribe((res: any) => {
      if (res) {
        this.docForm.controls['uomcategoryName'].setErrors({ country: true });
      } else {
        this.docForm.controls['uomcategoryName'].setErrors(null);
      }
    });
  }
}
validateCategoryCode(event) {
  if (event != undefined && event != null && event != "") {
    this.httpService.get<any>(this.uomService.uniqueValidateUrl + "?tableName=" + "uom_category" + "&columnName=" + "uomcategory_code" + "&columnValue=" + event).subscribe((res: any) => {
      if (res) {
        this.docForm.controls['uomcategoryCode'].setErrors({ uom_category: true });
      } else {
        this.docForm.controls['uomcategoryCode'].setErrors(null);
      }
    });
  }
}
}
