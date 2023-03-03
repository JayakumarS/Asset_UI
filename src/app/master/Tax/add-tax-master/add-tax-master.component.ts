import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { TaxMaster } from '../tax-model';
import { TaxService } from '../tax.service';
import { CommonService } from 'src/app/common-service/common.service';


@Component({
  selector: 'app-add-tax-master',
  templateUrl: './add-tax-master.component.html',
  styleUrls: ['./add-tax-master.component.sass']
})
export class AddTaxMasterComponent implements OnInit {

  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;
  taxMaster : TaxMaster;
  inputvalue1 = "";
  constructor(private fb: FormBuilder,
    private taxMasterService : TaxService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private router:Router) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],

      taxname: ["",[Validators.required]],
      taxcode: ["",[Validators.required]],
      taxtype: ["",[Validators.required]],
      taxmethod: [""],
      taxpercentage: ["",[Validators.required]],
      taxamount: [""],
      taxid: [""],
      active:[true],
      id:[""],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId(),
      loginedUser: this.tokenStorage.getUserId(),

    });

  }

  ngOnInit(): void {
     this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;



      }
     });
  }

  onSubmit(){
    this.taxMaster = this.docForm.value;
    console.log(this.taxMaster);
    if(this.docForm.valid){

    this.taxMasterService.addTax(this.taxMaster).subscribe({
      next: (data) => {
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          this.router.navigate(['/master/tax/listTax']);
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Added...!!!",
            "bottom",
            "center"
          );
        }
      }
    });
  }
  }

  // Edit
  fetchDetails(id: any): void {
    this.httpService.get(this.taxMasterService.editTaxMaster+"?id="+id).subscribe((res: any)=> {
      console.log(id);


      this.docForm.patchValue({

        'taxname': res.taxMasterBean.taxname,
        'taxcode': res.taxMasterBean.taxcode,
        'taxtype': res.taxMasterBean.taxtype.toString(),
        'taxmethod': res.taxMasterBean.taxmethod.toString(),
        'taxpercentage': res.taxMasterBean.taxpercentage,
        'taxamount': res.taxMasterBean.taxamount,
        'taxid': res.taxMasterBean.taxid,
        'active': res.taxMasterBean.active,
        'id' : res.taxMasterBean.id
     })
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  update(){
    if(this.docForm.valid){

    this.taxMaster = this.docForm.value;
    this.taxMasterService.taxMasterUpdate(this.taxMaster);
    this.showNotification(
      "snackbar-success",
      "Record Updated Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/tax/listTax']);
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right"
    );
  }
  }

  onCancel(){
     this.router.navigate(['/master/tax/listTax']);
  }

  reset(){
    if (!this.edit) {
    this.docForm = this.fb.group({
      taxname: [""],
      taxcode: [""],
      taxtype: [""],
      taxmethod: [""],
      taxpercentage: [""],
      taxamount: [""],
      taxid: [""],
      Description: [""],
      active: [true],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId()

    });
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

  
  keyPressName(event: any) {
    const pattern = /[A-Z,a-z]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressNumberInt(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  taxpercentageValidation(data: any) {
    if (data.get('taxpercentage').value != undefined && data.get('taxpercentage').value != null && data.get('taxpercentage').value != '') {
      if (data.get('taxpercentage').value < 1) {
        data.controls.taxpercentage.setValidators(Validators.compose([Validators.required, Validators.max(100), Validators.min(1), Validators.pattern(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/)]));
        data.controls.taxpercentage.setValidators(Validators.compose([Validators.required, Validators.max(100), Validators.min(1), Validators.pattern(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/)]));
        data.controls['taxpercentage'].updateValueAndValidity();
      } else if (data.get('taxpercentage').value > 100) {
        data.controls.taxpercentage.setValidators(Validators.compose([Validators.required, Validators.max(100), Validators.min(1), Validators.pattern(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/)]));
        data.controls['taxpercentage'].updateValueAndValidity();
      } else {
        data.controls.taxpercentage.clearValidators();
        data.controls['taxpercentage'].updateValueAndValidity();
      }
    } else {
      data.controls.taxpercentage.clearValidators();
      data.controls['taxpercentage'].updateValueAndValidity();
    }
  }

  // validateTaxName(event){
  //   this.httpService.get<any>(this.taxMasterService.validateTaxNameURL + "?tableName=" + "tax" + "&columnName=" + "tax_name" + "&columnValue=" + event).subscribe((res: any) => {
  //     if (res){
  //       this.docForm.controls['taxname'].setErrors({ taxName: true });
  //     }else{
  //       // this.docForm.controls['taxcode'].setErrors({ status: true });
  //     }
  //   });
  // }

  validateTaxName(event) {
    let companyId=this.tokenStorage.getCompanyId();
    if (event != undefined && event != null && event != "") {
      this.httpService.get<any>(this.commonService.uniqueValidateCompanyBasedUrl + "?tableName=" + "tax" + "&columnName=" + "tax_name" + "&columnValue=" + event + "&companycolumnname=" + "company_id" + "&companyvalue="+companyId).subscribe((res: any) => {
        if (res) {
          this.docForm.controls['taxname'].setErrors({ country: true });
        } else {
          this.docForm.controls['taxname'].setErrors(null);
        }
      });
    }
  }
  
  // validateTaxNameForEdit(event) {
  //   let companyId=this.tokenStorage.getCompanyId();
  //   if (event != undefined && event != null && event != "") {
  //     this.httpService.get<any>(this.commonService.uniqueValidateCompanyBasedForEditUrl + "?tableName=" + "tax" + "&columnName=" + "tax_name" + "&columnValue=" + event + "&companycolumnname=" + "company_id" + "&companyvalue="+companyId).subscribe((res: any) => {
  //       if (res) {
  //         this.docForm.controls['taxname'].setErrors({ country: true });
  //       } else {
  //         this.docForm.controls['taxname'].setErrors(null);
  //       }
  //     });
  //   }
  // }

  validateTaxCode(event){
    this.httpService.get<any>(this.taxMasterService.validateTaxCodeURL + "?tableName=" + "tax" + "&columnName=" + "tax_code" + "&columnValue=" + event).subscribe((res: any) => {
      if (res){
        this.docForm.controls['statusname'].setErrors({ taxCode: true });
      }else{
       // this.docForm.controls['emailId'].setErrors(null);
      }
    });
  }

}

