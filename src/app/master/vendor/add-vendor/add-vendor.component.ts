import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { VendorService } from '../vendor.service';
import { Commodity } from '../vendor-model';
import { CommodityResultBean } from '../vendor-result-bean';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CommonService } from 'src/app/common-service/common.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.sass']
})



export class AddVendorComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  [x: string]: any;
  agree3 = false;
  commodityMaster: Commodity;
  requestId: number;
  countryList: [];
  companyList: [];
  edit:boolean=false;
  currencyList: [];
  selection = new SelectionModel<Commodity>(true, []);

  constructor(private fb: FormBuilder, private router: Router,
              public route: ActivatedRoute, private snackBar: MatSnackBar,
              private vendorService: VendorService,
              private commonService: CommonService,
              private httpService: HttpServiceService,
              private notificationService: NotificationService,
              private spinner: NgxSpinnerService,) {

      this.docForm = this.fb.group({

      // AssetChek
      vendorId: [""],
      vendorName: ["", [Validators.required]],
      vendorShortName: ["", [Validators.required]],
      vendorAddress: ["", [Validators.required]],
      vendorCountry: ["", [Validators.required]],
      vendorEmail: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      currency: ["", [Validators.required]],
      vendorContact: ["", [Validators.required]],
      remarks: [""],
      company: ["", [Validators.required]],
      empid: [""],



    });
    }


   ngOnInit(): void {

    this.docForm = this.fb.group({

      // AssetChek
      vendorId: [""],
      vendorName: ["", [Validators.required]],
      vendorShortName: ["", [Validators.required]],
      vendorAddress: ["", [Validators.required]],
      vendorCountry: ["", [Validators.required]],
      vendorEmail: ['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      currency: ["", [Validators.required]],
      vendorContact: ["", [Validators.required]],
      company: ["", [Validators.required]],
      empid: [""],
      remarks: [""],



    });
    this.httpService.get<CommodityResultBean>(this.vendorService.currencyListUrl).subscribe(
      (data) => {
        this.currencyList = data.currencyList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    this.httpService.get<CommodityResultBean>(this.vendorService.countryListUrl).subscribe(
      (data) => {
        this.countryList = data.countryList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<any>(this.commonService.getCompanyStringDropdown).subscribe({
      next: (data) => {
        this.companyList = data;
      },
      error: (error) => {

      }
    });

    this.route.params.subscribe(params => {
      if (params.id!=undefined && params.id !=0 ){
       this.requestId = params.id;
       this.edit=true;
       // For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });
  }

  onsubmit(){

      if (this.docForm.valid){
    this.commodityMaster = this.docForm.value;
    console.log(this.commodityMaster);
    this.vendorService.addCommodity(this.commodityMaster, this.router, this.notificationService);

    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }

  }
  fetchDetails(empid: any): void {

      this.requestId = empid;
      this.httpService.get(this.vendorService.editcommodity + "?empid=" + empid).subscribe((res: any) => {
      console.log(empid);
      this.docForm.patchValue({
        'vendorName': res.venderBean.vendorName,
        'vendorCountry': res.venderBean.vendorCountry,
        'currency': parseInt(res.venderBean.currency),
        'vendorShortName' : res.venderBean.vendorShortName,
        'vendorAddress': res.venderBean.vendorAddress,
        'vendorEmail': res.venderBean.vendorEmail,
        'vendorContact': res.venderBean.vendorContact,
        'company': res.venderBean.company,
        'remarks': res.venderBean.remarks,
        'empid': res.venderBean.empid,

      })
    },
    (err: HttpErrorResponse) => {

     }
  );
}
keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // update(){
  //   this.commodityMaster = this.docForm.value;
  //   this.vendorService.updateCommodity(this.commodityMaster, this.router, this.notificationService);
  // }

  update() {
    // if (this.docForm.valid){
      if (this.docForm.value.emailId !=""){
    this.commodityMaster = this.docForm.value;
    this.spinner.show();
    this.vendorService.updateCommodity(this.commodityMaster).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "update Record Successfully",
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
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please Fill Full Name",
        "top",
        "right"
      );
    }
    // }
    // else{
    //   this.showNotification(
    //     "snackbar-danger",
    //     "Please Fill The All Required fields",
    //     "top",
    //     "right"
    //   );
    // }

    }
  onCancel(){
    this.router.navigate(['/master/vendor/listVendor']);

  }

  reset(){
    this.docForm = this.fb.group({
      // AssetChek
      vendorName: [""],
      vendorShortName: [""],
      vendorAddress: [""],
      vendorCountry: [""],
      vendorEmail: [""],
      currency: [""],
      vendorContact: [""],
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  validateEmail(event){
    // tslint:disable-next-line:max-line-length
    this.httpService.get<any>(this.vendorService.uniqueValidateUrl + "?tableName=" + "employee" + "&columnName=" + "email_id" + "&columnValue=" + event).subscribe((res: any) => {
      if (res){
        this.docForm.controls['vendorEmail'].setErrors({ employee: true });
      }else{
        this.docForm.controls['vendorEmail'].setErrors(null);
      }
    });
  }

}
