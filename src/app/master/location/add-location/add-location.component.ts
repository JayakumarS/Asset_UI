import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationMaster } from '../location-master.model';
import { LocationMasterService } from '../location-master.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/common-service/common.service';
import { TransferService } from 'src/app/admin/transferasset/transfer.service';
import { transferResultBean } from 'src/app/admin/transferasset/transfer-result-bean';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.sass']
})
export class AddLocationComponent implements OnInit {
  locationMaster: LocationMaster;
  inputvalue = "";
  inputvalue1 = "";
  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;
  company = [];
  hide3 = true;
  agree3 = false;
  dataarray = [];
  cusMasterData = [];
  salesEntryData = [];
  locationDdList = [];
  locationList = [];
  companyList = [];
  transferList: [];
  companyadList:[];
  companyText:any;
  user:any;
  companyId:any

  // tslint:disable-next-line:new-parens
  salesDetailRowData = new SalesEntryDetailRowComponent;
  submitted: boolean=false;

  constructor(private fb: FormBuilder,
              public router: Router,
              public route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private locationMasterService: LocationMasterService,
              public tokenStorage: TokenStorageService,
              private authService: AuthService, public commonService: CommonService,
              public transferservice: TransferService,
              private spinner: NgxSpinnerService,
              private httpService: HttpServiceService) {


   }


  ngOnInit(): void {


    this.companyText=this.tokenStorage.getCompanyText();
    console.log(this.companyText);

    this.docForm = this.fb.group({
      locationId: [""],
      locationCode: ["", [Validators.required]],
      locationName: ["", [Validators.required]],
      company: [""],
      // cslLocationCode: ["", [Validators.required]],
      parentLocation: [""],
      description: [""],
      active: [true],
      cascade: [true],
      primaryLocation: [""],
      alternateLocation: [""],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId(),
      userId:this.tokenStorage.getUserId() 


    });



    this.companyId = this.tokenStorage.getCompanyId(),

    this.httpService.get(this.commonService.getCompanybasedlocationDropdown + "?companyId=" + this.companyId).subscribe((res: any) => {
      this.locationList = res.addressBean;
      // tslint:disable-next-line:no-shadowed-variable
     // this.getcompanybaseduser(this.docForm.value.company);
    });
    this.httpService.get(this.commonService.getcompanybaseduser + "?company=" + this.companyId).subscribe((res: any) => {
      this.locationDdList = res.addressBean;
    });

    this.route.params.subscribe(params => {
      if (params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit = true;
       this.dataarray.push(this.salesDetailRowData)
       this.cusMasterData.push(this.docForm)
       this.cusMasterData.push(this.dataarray)
       // For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });

     //this.companys=this.tokenStorage.getCompanyId();
    this.user=this.tokenStorage.getUserId()
    this.httpService.get<any>(this.locationMasterService.companyadList+"?userId="+(this.user)).subscribe(
       (data) => {
         console.log(data);
         this.companyadList = data.locationMasterDetails;
       },
       (error: HttpErrorResponse) => {
         console.log(error.name + " " + error.message);
       }
     );

    // CompanygetCompanyDropdown dropdown
    this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe({
      next: (data) => {
        this.companyList = data;
        this.docForm.patchValue({
          'company':parseInt(this.companyId),
       })
      },
      error: (error) => {

      }
    });
    this.getUserbasedcompanyDropdown(this.docForm.value.userId);
  }



// location list
getCompanybasedlocationDropdown(companyId: any): void {

}
// company list
getUserbasedcompanyDropdown(userId: any): void {
  this.httpService.get(this.commonService.getUserBasedCompanyDropdown + "?userId=" + this.tokenStorage.getUsername()).subscribe((res: any) => {
  this.company = res.addressBean;
});
}



  onSubmit() {
    this.submitted = true;
    if (this.docForm.valid){
      this.locationMaster = this.docForm.value;
      this.spinner.show();
      this.locationMasterService.addLocation(this.locationMaster).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Record Added successfully...",
              "bottom",
              "center"
            );
            this.onCancel();
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
        "Please Fill The All Required fields",
        "bottom",
        "center"
      );
    }
  }
 onCancel(){
     this.router.navigate(['/master/location/listLocation']);
}

fetchDetails(locationId: any): void {
  const obj = {
    editId: locationId
  }
  this.locationMasterService.editLoction(obj).subscribe({
    next: (res) => {
    this.docForm.patchValue({
      'locationId': res.locationMasterBean.locationId,
        'locationCode': res.locationMasterBean.locationCode,
        'locationName': res.locationMasterBean.locationName,
        'parentLocation' :parseInt(res.locationMasterBean.parentLocation),
        'description' : res.locationMasterBean.description,
        'active': res.locationMasterBean.active,
        'cascade':  res.locationMasterBean.cascade,
        'primaryLocation': res.locationMasterBean.primaryLocation,
        'alternateLocation': res.locationMasterBean.alternateLocation,
        'company': res.locationMasterBean.company,
    });
  },
  error: (error) => {
  }
});
}

  update() {
    this.locationMaster = this.docForm.value;
    this.spinner.show();
    this.locationMasterService.update(this.locationMaster).subscribe({
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
  }
  reset(){
    if (!this.edit) {
      this.docForm = this.fb.group({
        locationId: [""],
        locationCode: [""],
        locationName: [""],
        // cslLocationCode: ["", [Validators.required]],
        parentLocation: [""],
        description: [""],
        active: [true],
        cascade: [true],
        primaryLocation: [""],
        alternateLocation: [""],
        company:[""],
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
    const pattern = /[A-Z,a-z 0-9]/;
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
  keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  string(event: any) {
    const pattern = /[A-Z,a-z ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
