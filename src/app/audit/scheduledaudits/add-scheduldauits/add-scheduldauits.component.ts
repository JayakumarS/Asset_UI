import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ScheduledauditsService } from '../scheduledaudits.service';
import { ScheduledAudit } from '../scheduledaudits-model';
import { NgxSpinnerService } from "ngx-spinner";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-add-scheduldauits',
  templateUrl: './add-scheduldauits.component.html',
  styleUrls: ['./add-scheduldauits.component.sass'],
  // Date Related code
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
        },
      }
    }, CommonService
  ]
})
export class AddScheduldauitsComponent implements OnInit {
  docForm: FormGroup;
  scheduledAudit : ScheduledAudit;
  Formdoc: FormGroup;
  auditorList:any;
  edit:boolean=false;
  companyId: string;
  requestId: any;
  locationDropdownList:any
  assetDropdownList:any
  companyList:any;
  auditDetails:any;
  statusList: any = ['Available', 'Not Available'];
  roleId: any;
  
    constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public scheduledauditsService: ScheduledauditsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,   
    public tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService
  )
   { 

    this.docForm = this.fb.group({
      roleId : this.tokenStorage.getRoleId(),
      status : ["pending",[Validators.required]],
      manageAuditId : ["",[Validators.required]],
      manageAuditNo : ["",[Validators.required]],
      loginedUser: this.tokenStorage.getUserId(),
     
      scheduleAuditDetail: this.fb.array([
        this.fb.group({
          assetId: ["",[Validators.required]],
          assetCode: ["",[Validators.required]],
          physicalQty: ["",[Validators.required]],
          makerstatus: [""],
          checkerstatus: [""],
          availableQty:[""],
          differenceQty:[""],
          stockAdjustment:[""],
          makerRemarks:[""],
          checkerRemarks:[""],
          companyAdminRemarks:[""],
        })
      ]),
  });
  }

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    if(params.id!=undefined && params.id!=0){
     this.requestId = params.id;
     this.edit=true;
     this.fetchDetails(this.requestId);
    }
  });
  this.roleId=this.tokenStorage.getRoleId();
  this.companyId=this.tokenStorage.getCompanyId();
  this.httpService.get<any>(this.commonService.getassetname+"?companyId="+this.companyId).subscribe({
      next: (data) => {
      this.assetDropdownList = data;
    },
    error: (error) => {
    }
  });
}

  onSubmit(status: String) {
    this.docForm.patchValue({
      'status': status,
    })
    if (this.docForm.valid) {
      this.scheduledAudit = this.docForm.value;
      this.spinner.show();
      this.scheduledauditsService.addAudit(this.scheduledAudit).subscribe({
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
    } else {
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }

  
  fetchDetails(id: any): void {
    const obj = {
      editId: id,
      companyId: this.tokenStorage.getCompanyId()
    }
    this.spinner.show();
    this.scheduledauditsService.editAudit(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        if(res != null){
          this.auditDetails=res?.scheduleAudit;
          this.docForm.patchValue({
            'manageAuditId': res?.scheduleAudit?.manageAuditId,
            'manageAuditNo': res?.scheduleAudit?.manageAuditNo,
          })
        }
        if (res?.scheduleAuditDetailList != null && res?.scheduleAuditDetailList.length >= 1) {
          let scheduleAuditDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
          scheduleAuditDetailArray.removeAt(0);
          res?.scheduleAuditDetailList.forEach(element => {
            let scheduleAuditDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
            let arraylen = scheduleAuditDetailArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              assetId : [element?.assetId],
              assetCode : [element?.assetCode],
              physicalQty : [element?.physicalQty],
              makerstatus : [element?.makerstatus],
              checkerstatus: [element?.checkerstatus],
              availableQty : [element?.availableQty],
              differenceQty : [element?.differenceQty],
              stockAdjustment : [element?.stockAdjustment],
              makerRemarks : [element?.makerRemarks],
              checkerRemarks : [element?.checkerRemarks],
              companyAdminRemarks : [element?.companyAdminRemarks],
            })
            scheduleAuditDetailArray.insert(arraylen, newUsergroup);
          });
        }
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
  }


  reset() {
    if (!this.edit) {
      this.docForm.reset();
      let scheduleAuditDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
      scheduleAuditDetailArray.clear();
      this.docForm.patchValue({
        'loginedUser': this.tokenStorage.getUserId(),
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }

  onCancel(){
    this.router.navigate(['audit/scheduledaudits/list-scheduledaudits']);
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

 keyPressNumberInt(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressRemarks(event: any) {
    const pattern = /[ a-zA-Z0-9 !@()#$%&*_+"'\-=\;:\\|,.\/? ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 

  addRow(){
    let scheduleAuditDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
    let arraylen = scheduleAuditDetailArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      assetId: ["",[Validators.required]],
      assetCode: ["",[Validators.required]],
      physicalQty: ["",[Validators.required]],
      makerstatus: [""],
      checkerstatus: [""],
      availableQty:[""],
      differenceQty:[""],
      stockAdjustment:[""],
      makerRemarks:[""],
      checkerRemarks:[""],
      companyAdminRemarks:[""],
    })
    scheduleAuditDetailArray.insert(arraylen, newUsergroup);
  }
  

  removeRow(index){
    let scheduleAuditDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
    scheduleAuditDetailArray.removeAt(index);
  }
  
}


