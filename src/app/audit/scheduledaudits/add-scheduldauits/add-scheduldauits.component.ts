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
import { TokenStorageService } from 'src/app/auth/token-storage.service';
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
  flag:boolean;
  
  requestId: any;
  edit:boolean=false;
  locationDropdownList:any
  assetDropdownList:any
  companyList:any
  @ViewChild('tabs') tabGroup: MatTabGroup;
  val: any;
  dateChange: boolean = false;

    constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public scheduledauditsService: ScheduledauditsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,    
    public tokenStorage: TokenStorageService,

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

      scheduledDetailbean: this.fb.array([
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
     if(params.id.includes("AU")){
      this.flag = true;
      this.fetchDetails(this.requestId) ;

     }
     else {
      this.flag =false ;
     this.fetchDetailsA(this.requestId);
     }
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
          'companyName':res.manageAuditBean.companyName,
          'auditorName':res.manageAuditBean.auditorName,
          'assetName':res.manageAuditBean.assetName,
          'location':res.manageAuditBean.location,
          'Quantity':res.manageAuditBean.quantity,
          'remarks':res.manageAuditBean.remarks,
          


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

  fetchDetailsA(id): void {
    this.requestId = id;
    this.httpService.get(this.scheduledauditsService.scheduleedit + "?id=" + id).subscribe((res: any) => {
  
      console.log(id);
  
      this.docForm.patchValue({
        'startDateObj': this.commonService.getDateObj(res.scheduledBean.startDate),
          'startDate': this.commonService.getDateObj(res.scheduledBean.startDate),
          'auditName': res.scheduledBean.auditName,
          'auditCode':res.scheduledBean.auditCode,
          'companyName':res.scheduledBean.companyName,
          'auditorName':parseInt(res.scheduledBean.auditorName)
     })
  
  
     
     let manageAuditDtlArray = this.docForm.controls.scheduledDetailbean as FormArray;
     manageAuditDtlArray.removeAt(0);
     if(res.scheduledBean.scheduledDetailbean!=null){
  
     
      res.scheduledBean.scheduledDetailbean.forEach(element => {
            let manageAuditDtlArray = this.docForm.controls.scheduledDetailbean as FormArray;
            let arraylen = manageAuditDtlArray.length;
            let newUsergroup: FormGroup = this.fb.group({
              assetName:[element.assetName],
              location:[element.location],
              sampleQty:[element.quantity],
              remarks:[element.remarks],
              newQty:[element.newQty],
              diffqty:[element.diffqty],
              stack:[element.stack]
    

            
              
          })
          manageAuditDtlArray.insert(arraylen,newUsergroup);
        });
      }
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
   
  }

  onSubmit(){
    if(this.docForm.valid){
      this.docForm.patchValue({
        'type':'Submit',
      })
if(this.dateChange==false){
  let cdate = this.commonService.getDate(this.docForm.get('startDateObj').value);
  this.docForm.patchValue({startDate:cdate});
}
   

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

  saveasdraft(){
    if(this.docForm.valid){
      this.docForm.patchValue({
        'type':'Draft'
      })
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
      loginedUser: this.tokenStorage.getUserId(),

      scheduledDetailbean: this.fb.array([
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
    this.dateChange=true;
    let cdate = this.commonService.getDate(event.target.value);
    if(inputFlag=='startDate'){
      this.docForm.patchValue({startDate:cdate});
    }
    else if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:cdate});
    }
   
  }
 

  addRow(){
    let scheduledListDetailArray = this.docForm.controls.scheduledDetailbean as FormArray;
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
    let scheduledListDetailArray = this.docForm.controls.scheduledList as FormArray;
    scheduledListDetailArray.removeAt(index);
  }
  }


