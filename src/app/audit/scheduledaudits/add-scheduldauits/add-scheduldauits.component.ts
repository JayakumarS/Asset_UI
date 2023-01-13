import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { ScheduledauditsService } from '../scheduledaudits.service';

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
  Formdoc: FormGroup;
  auditorList:any;
  requestId: any;
  edit:boolean=false;
  locationDropdownList:any
  assetDropdownList:any
  companyList:any
  @ViewChild('tabs') tabGroup: MatTabGroup;

    constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private httpService: HttpServiceService,
    // private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public scheduledauditsService: ScheduledauditsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations
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

      scheduledList: this.fb.array([
        this.fb.group({
          assetName: '',
          location: '',
          Quantity: '',
          remarks: '',
         
        })
      ]),


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

  this.httpService.get<any>(this.commonService.getassetname).subscribe({
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



  fetchDetails(id){
    this.httpService.get(this.scheduledauditsService.edit+"?id="+id).subscribe((res: any)=> {
      console.log(res);
  
      if(res.manageAuditBean.auditType=="Self"){
        this.docForm.patchValue({
          'startDateObj': this.commonService.getDateObj(res.manageAuditBean.startDate),
          'startDate': res.manageAuditBean.startDate,
          'auditName': res.manageAuditBean.auditName,
          'auditCode':res.manageAuditBean.auditCode,
          'companyName':res.manageAuditBean.companyName
  
       })  
    
       
       
       let manageAuditDtlArray = this.docForm.controls.manageAuditDtlObjBean as FormArray;
       manageAuditDtlArray.removeAt(0);
       if(res.manageAuditBean.manageAuditDtlObjBean!=null){
        }
  
      }else if(res.manageAuditBean.auditType=="Aided"){
        this.docForm.patchValue({
          'startDateObj': this.commonService.getDateObj(res.manageAuditBean.startDate),
          'startDate': this.commonService.getDateObj(res.manageAuditBean.startDate),
          'auditName': res.manageAuditBean.auditName,
          'auditCode':res.manageAuditBean.auditCode,
          'companyName':res.manageAuditBean.companyName
       })  
    
       
       let manageAuditDtlArray = this.Formdoc.controls.manageAuditDtlObjBean as FormArray;
       manageAuditDtlArray.removeAt(0);
       if(res.manageAuditBean.manageAuditDtlObjBean!=null){
       
        }
  
        
      }
  
      
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  
  }

  onSubmit(){
    if(this.docForm.valid){
      this.httpService.post<any>(this.scheduledauditsService.save, this.docForm.value).subscribe(data => {
        if(data.success){
          this.showNotification(
            "snackbar-success",
            "Record Added Successfully...!!!",
            "bottom",
            "center"
          );
          this.reset();
          this.router.navigate(['audit/scheduledaudits/list-scheduledaudits']);
        }
        else{
          this.showNotification(
            "snackbar-danger",
            data.message + "...!!!",
            "bottom",
            "center"
          );
        }
        
        },
        (err: HttpErrorResponse) => {
          
      });
    }

  }

  update()
  {

  }
  reset(){

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
    if(inputFlag=='startdate'){
      this.docForm.patchValue({startdate:cdate});
    }
    else if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:cdate});
    }
   
  }

  addRow(){
    let scheduledListDetailArray = this.docForm.controls.scheduledList as FormArray;
    let arraylen = scheduledListDetailArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      auditorName:[""],
      startDate:[""],
      assetName:[""],
      location:[""],
      Quantity:[""],
      remarks:[""],
     
    })
    scheduledListDetailArray.insert(arraylen, newUsergroup);
  }

  removeRow(index){
    let scheduledListDetailArray = this.docForm.controls.scheduledList as FormArray;
    scheduledListDetailArray.removeAt(index);
  }
  }


