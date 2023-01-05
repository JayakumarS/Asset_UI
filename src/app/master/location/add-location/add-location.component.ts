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

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.sass']
})
export class AddLocationComponent implements OnInit {
  locationMaster: LocationMaster;
  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;

  hide3 = true;
  agree3 = false;
  dataarray = [];
  cusMasterData = [];
  salesEntryData = [];
  locationDdList = [];
  transferList: [];
  // tslint:disable-next-line:new-parens
  salesDetailRowData = new SalesEntryDetailRowComponent;
  constructor(private fb: FormBuilder,
              public router: Router,
              public route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private locationMasterService: LocationMasterService,
              private authService: AuthService, public commonService: CommonService,
              public transferservice: TransferService,
              private spinner: NgxSpinnerService,
              private httpService: HttpServiceService) {


   }
  //   !!
  // ngOnInit(): void {
  //   this.dataarray.push(this.salesDetailRowData)
  //   this.cusMasterData.push(this.docForm)
  //   this.cusMasterData.push(this.dataarray)
  // }
  // onSubmit() {
  //   this.locationMaster = this.docForm.value;
  //   console.log(this.locationMaster);
  //   this.locationMasterService.addLocation(this.locationMaster);
  //   this.showNotification(
  //     "snackbar-success",
  //     "Add Record Successfully...!!!",
  //     "bottom",
  //     "center"
  //   );
  //   this.router.navigate(['/master/location/listLocation']);
  //   console.log("Form Value", this.docForm.value);
  //   console.log(this.dataarray)
  //   console.log(this.cusMasterData)
  //   console.log(this.salesEntryData)
  // }

  ngOnInit(): void {
    this.docForm = this.fb.group({
      locationId: [""],
      locationCode: ["", [Validators.required]],
      locationName: ["", [Validators.required]],
      // cslLocationCode: ["", [Validators.required]],
      parentLocation: ["", [Validators.required]],
      description: [""],
      active: [""],
      cascade: [""],
      primaryLocation: [""],
      alternateLocation: [""],
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
    // Location dropdown
    this.httpService.get<any>(this.commonService.getuserlocation).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    });

  }

  onSubmit() {
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
        'parentLocation' : res.locationMasterBean.parentLocation,
        'description' : res.locationMasterBean.description,
        'active': res.locationMasterBean.active,
        'cascade':  res.locationMasterBean.cascade,
        'primaryLocation': res.locationMasterBean.primaryLocation,
        'alternateLocation': res.locationMasterBean.alternateLocation,

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
        locationCode: ["", [Validators.required]],
        locationName: ["", [Validators.required]],
        // cslLocationCode: ["", [Validators.required]],
        parentLocation: ["", [Validators.required]],
        description: [""],
        active: [""],
        cascade: [""],
        primaryLocation: [""],
        alternateLocation: [""],
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
}
