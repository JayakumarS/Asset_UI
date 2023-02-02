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
      auditName:[""],
      auditCode:["",[Validators.required]],
      startDateObj:[""],
      companyName:["",[Validators.required]],
      auditorName:[""],
      startDate:[""],
      assetName:[""],
      location:[""],
      Quantity:[""],
      remarks:[""],
      type:[""],
      loginedUser: this.tokenStorage.getUserId(),
      companyId: this.tokenStorage.getCompanyId(),
      branchId: this.tokenStorage.getBranchId(),

      scheduleAuditDetail: this.fb.array([
        this.fb.group({
          assetName: '',
          location: '',
          sampleQty: '',
          remarks: '',
          newQty:'',
          diffqty:'',
          stack:''
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

  
  this.httpService.get<any>(this.commonService.getAuditorDropdown).subscribe({
    next: (data) => {
      this.auditorList = data;
    },
    error: (error) => {
    }
  });

  this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
    next: (data) => {
      this.locationDropdownList = data;
    },
    error: (error) => {
    }
  });

  this.companyId=this.tokenStorage.getCompanyId();
  this.httpService.get<any>(this.commonService.getassetname+"?companyId="+this.companyId).subscribe({
      next: (data) => {
      this.assetDropdownList = data;
    },
    error: (error) => {
    }
  });

  this.httpService.get<any>(this.commonService.getCompanyDropdown).subscribe({
    next: (data) => {
      this.companyList = data;
    },
    error: (error) => {
    }
  });
  }


  onSubmit(status: String) {
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
      editId: id
    }
    this.spinner.show();
    this.scheduledauditsService.editAudit(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();

        this.docForm.patchValue({
          'startDateObj': this.commonService.getDateObj(res.manageAuditBean.startDate),
          'startDate': this.commonService.getDateObj(res.manageAuditBean.startDate),
          'auditName': res.manageAuditBean.auditName,
          'auditCode':res.manageAuditBean.auditCode,
          'companyName':res.manageAuditBean.companyName,
          'auditorName':res.manageAuditBean.auditorName,
          'assetName':res.manageAuditBean.assetName,
          'location':res.manageAuditBean.location,
          'Quantity':res.manageAuditBean.quantity,
          'remarks':res.manageAuditBean.remarks,
        })

    

        if (res.scheduledListDetailList != null && res.scheduledListDetailList.length >= 1) {
          let scheduledListDetailArray = this.docForm.controls.scheduledListDetail as FormArray;
          scheduledListDetailArray.removeAt(0);
          res.scheduledListDetailList.forEach(element => {
            let scheduledListDetailArray = this.docForm.controls.scheduledListDetail as FormArray;
            let cdate = this.commonService.getDateObj(element.edd);
            let arraylen = scheduledListDetailArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              assetName:[element.assetName],
              location:[element.location],
              sampleQty:[element.quantity],
              remarks:[element.remarks],
              newQty:[element.newQty],
              diffqty:[element.diffqty],
              stack:[element.stack]
            })
            scheduledListDetailArray.insert(arraylen, newUsergroup);
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
      let scheduledListDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
      scheduledListDetailArray.clear();
      this.docForm.patchValue({
        'loginedUser': this.tokenStorage.getUserId(),
        'companyId': this.tokenStorage.getCompanyId(),
        'branchId': this.tokenStorage.getBranchId()
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

  getDateString(event,inputFlag,index){
    let cdate = this.commonService.getDate(event.target.value);
    if(inputFlag=='startDate'){
      this.docForm.patchValue({startDate:cdate});
    }
    else if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:cdate});
    }
  }
 

  addRow(){
    let scheduledListDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
    let arraylen = scheduledListDetailArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      auditorName:[""],
      startDate:[""],
      assetName:[""],
      location:[""],
      sampleQty:[""],
      remarks:[""],
      newQty:'',
      diffqty:'',
      stack:''
    })
    scheduledListDetailArray.insert(arraylen, newUsergroup);
  }
  

  removeRow(index){
    let scheduledListDetailArray = this.docForm.controls.scheduleAuditDetail as FormArray;
    scheduledListDetailArray.removeAt(index);
  }
  
}


