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
  statusList: any=[];
  roleId: any;
  isValid: boolean = true;
  auditId: any;
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
          physicalQty: [""],
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

    this.roleId=this.tokenStorage.getRoleId();
    this.companyId=this.tokenStorage.getCompanyId();
    this.httpService.get<any>(this.commonService.getassetnameAudit+"?companyId="+this.companyId).subscribe({
        next: (data) => {
        this.assetDropdownList = data;
      },
      error: (error) => {
      }
    });
  this.route.params.subscribe(params => {
    if(params.id!=undefined && params.id!=0){
     this.requestId = params.id;
     this.edit=true;
     this.fetchDetails(this.requestId);
     this.auditId=this.requestId;
    }
  });
 

  // Status dropdown
  this.httpService.get<any>(this.commonService.getStatusDropdown + "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe({
    next: (data) => {
      this.statusList = data;
    },
    error: (error) => {

    }
  });
}

dropDownList(){
  this.httpService.get<any>(this.commonService.getassetnameAudit + "?companyId=" + this.companyId + "&auditId=" + this.auditId).subscribe({
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

    if(this.tokenStorage.getRoleId()=='3'){
      let scheduleAuditDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
      this.isValid=true;
     for(let x=0;x<scheduleAuditDetailArray.length;x++){
        //scheduleAuditDetailArray.at(x).setValidators[('checkerRemarks')]
        let val=scheduleAuditDetailArray.at(x).get('checkerRemarks').value;
        if(val==null || val==""){
          this.isValid=false;
        }
      }
    }
    if(this.isValid) {
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
  } else {
    this.showNotification(
      "snackbar-danger",
      "Please fill the remarks!",
      "top",
      "right"
    );
  }
  }

  
  fetchDetails(id: any): void {
    this.dropDownList();
    const obj = {
      editId: id,
      companyId: this.tokenStorage.getCompanyId(),
      roleId: this.tokenStorage.getRoleId()
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
        this.httpService.get<any>(this.commonService.getassetnameAudit+"?companyId="+res?.scheduleAudit?.companyId).subscribe({
          next: (data) => {
          this.assetDropdownList = data;
        },
        error: (error) => {
        }
      });

     

        if (res?.scheduleAuditDetailList != null && res?.scheduleAuditDetailList.length >= 1) {
          let scheduleAuditDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
          scheduleAuditDetailArray.removeAt(0);
          scheduleAuditDetailArray.clear();
          res?.scheduleAuditDetailList.forEach(element => {
            let scheduleAuditDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
            let arraylen = scheduleAuditDetailArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              assetId : [element?.assetId],
              assetCode : [element?.assetCode],
              physicalQty : [element?.physicalQty],
              makerstatus : [parseInt(element?.makerstatus)],
              checkerstatus: [parseInt(element?.checkerstatus)],
              availableQty : [element?.availableQty],
            //  differenceQty : [Math.abs(element?.physicalQty - element?.availableQty)],
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
      companyAdminRemarks:[""]
    })
    scheduleAuditDetailArray.insert(arraylen, newUsergroup);
  }
  

  removeRow(index){
    let scheduleAuditDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
    scheduleAuditDetailArray.removeAt(index);

  }
  
  validateAssetName(index){
    let scheduleAuditDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
    let val=scheduleAuditDetailArray.at(index).get('assetId').value;
   
    for(let i=0; i<scheduleAuditDetailArray.length-1; i++){ 
      
      console.log(this.docForm['controls']['scheduleAuditDetail']['controls'][i].value["assetId"]);
      
      if(this.docForm['controls']['scheduleAuditDetail']['controls'][i].value["assetId"]==val){
        this.showNotification(
          "snackbar-danger",
          "Asset already Exists!",
          "top",
          "right"
        );
        scheduleAuditDetailArray.at(index).patchValue({
          assetId:""
        });
      }
    }  
    
        
  }


}


