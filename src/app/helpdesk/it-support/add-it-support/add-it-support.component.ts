import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Itsupport } from '../it-support.model';
import { Itsupportservice } from '../it-support.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

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
  selector: 'app-add-it-support',
  templateUrl: './add-it-support.component.html',
  styleUrls: ['./add-it-support.component.sass'],

  // Date Related code
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
      },
  } },CommonService
  ]


})

export class AddItSupportComponent implements OnInit {
  [x: string]: any;
  edit:boolean=false;

  docForm: FormGroup;
  itsupport: Itsupport;
  assetnamelist:[""]
  assetlocationlist:[""]
  id: any;
  CCFlag: boolean = false;
  public modeselect = 'OPENED';
  constructor(private cmnService:CommonService,private fb: FormBuilder,private httpService: HttpServiceService,
    private  itsupportservice: Itsupportservice, private commonService: CommonService,
    public router:Router,private snackBar: MatSnackBar,
    public dialog: MatDialog,public route: ActivatedRoute,private tokenStorageService:TokenStorageService) 
    
    { 
    this.docForm = this.fb.group({
    
      reportdate:[""],
      reportdateObj:[""],
      uploadImg:[""],
      asset:[""],
      assetlocation:[""],
      reportedby:this.loginedUser,
      tickettype:["",[Validators.required]],
      ticketgroup:[""],
      assignee:["support@assetchek.com"],
      priority:[""],
      cc:["",[Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      description:[""],
      report:[false],
      status:[""],
      support_id:[""],
      loginedUser: this.tokenStorageService.getUserId(),
      companyid:[""],
      branchid:[""],
    
    });
    }
  ngOnInit(): void {
   
    this.loginedUser=this.tokenStorageService.getUsername();
    console.log(this.loginedUser);

    this.docForm = this.fb.group({

      reportdate:["",[Validators.required]],
      reportdateObj:["",[Validators.required]],
      uploadImg:[""],
      asset:["",[Validators.required]],
      assetlocation:["",[Validators.required]],
      reportedby:this.loginedUser,
      companyid: this.tokenStorageService.getCompanyId(),
      branchid: this.tokenStorageService.getBranchId(),
      tickettype:["",[Validators.required]],
      ticketgroup:["",[Validators.required]],
      assignee:["support@assetchek.com"],
      priority:["",[Validators.required]],
      cc:["",[Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      description:[""],
      report:[false],
      status:[""],
      support_id:[""],
      assetid:[""],
 
    });

    
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       this.fetchDetails(this.requestId) ;
   
      }
     });
  
  
   // assetname dropdown
   this.companyId=this.tokenStorageService.getCompanyId();
   this.httpService.get<any>(this.commonService.getassetname+"?companyId="+this.companyId).subscribe({
    next: (data) => {
      this.assetnamelist = data;
    },
    error: (error) => {

    }
  }
  );

    // assetlocationlist dropdown
   this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
    next: (data) => {
      this.assetlocationlist = data;
    },
    error: (error) => {

    }
  }
  );
  }
  onsubmit(){// assetname dropdown
    if (this.docForm){
    this.companyId=this.tokenStorageService.getCompanyId();
    this.httpService.get<any>(this.commonService.getassetname+"?companyId="+this.companyId).subscribe({
      next: (data) => {
       this.assetnamelist = data;
     },

     error: (error) => {
 
     }
   }
   );
  //   this.itsupport = this.docForm.value;
  //     console.log(this.itsupport);
  //     // this.itsupportservice.addassetticket(this.itsupport);
    
  //     if(this.docForm.valid){
  //       this.itsupportservice.addassetticket(this.itsupport);

  //     this.router.navigate(['/helpdesk/itsupport/listitsupport' ]);
     
  // }
  this.itsupport = this.docForm.value;
      console.log(this.itsupport);
      // this.itsupportservice.addassetticket(this.itsupport);
    
      if(this.docForm.valid){
        this.itsupportservice.addassetticket(this.itsupport);

      this.router.navigate(['/helpdesk/itsupport/listitsupport']);
  }
}
}

fetchlocationDetails(assetid: any) {

  this.httpService.get(this.itsupportservice.fetchlocationlist + "?assetId=" + assetid).subscribe((res: any) => {
    console.log(assetid);

    this.assetlocationlist = res.getlocationList;
    
  },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );


}
onSelectFile(event) {
  var docfile = event.target.files[0];
  if (!this.acceptFileTypes.includes(docfile.type)) {
    this.showNotification(
      "snackbar-danger",
      "Invalid Image type",
      "bottom",
      "center"
    );
    return;
  }
  if (docfile.size > 5242880) {
    this.showNotification(
      "snackbar-danger",
      "Please upload valid image with less than 5mb",
      "bottom",
      "center"
    );
    return;
  }
  var fileExtension = docfile.name;
  var frmData: FormData = new FormData();
  frmData.append("file", docfile);
  frmData.append("fileName", fileExtension);
  frmData.append("folderName", "AssetProfileFile");

  this.httpService.post<any>(this.commonService.uploadFileUrl, frmData).subscribe({
    next: (data) => {
      if (data.success) {
        if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
          this.docForm.patchValue({
            'uploadFiles': data.filePath
          })
          this.filePathUrl = data.filePath;
        }
      } else {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload File",
          "bottom",
          "center"
        );
      }
    },
    error: (error) => {
      this.showNotification(
        "snackbar-danger",
        "Failed to upload File",
        "bottom",
        "center"
      );
    }
  });
}

getCC(event: any){
  
  if (event) {
    this.CCFlag = true;
  }
  else {
    this.CCFlag = false;

  }
}
viewDocuments(filePath: any, fileName: any) {
  var a = document.createElement("a");
        a.href = this.serverUrl.apiServerAddress+"asset_upload/"+filePath;
        a.target = '_blank';
        a.download = fileName;
        a.click();
}

refresh(){

    this.loadData();
  
}

reset(){
  if (!this.edit) {
    location.reload()
    this.docForm.reset();
  
  }

  this.docForm = this.fb.group({
  
    reportdate:[""],
    reportdateObj:[""],
    uploadImg:[""],
    asset:[""],
    assetlocation:[""],
    reportedby:this.loginedUser,
    tickettype:[""],
    ticketgroup:[""],
    assignee:this.loginedUser,
    priority:[""],
    cc:[""],
    description:[""],
    report:[false],
    status:[""],
    support_id:[""]



  
});
}
getDateString(event,inputFlag,index){
  let cdate = this.cmnService.getDate(event.target.value);
  if(inputFlag=='reportdate'){
    this.docForm.patchValue({reportdate:cdate});
  }
}


  fetchDetails(id: any): void {
    this.httpService.get(this.itsupportservice.editItSupport+"?id="+id).subscribe((res: any)=> {
      console.log(id);
      let cdate = this.cmnService.getDateObj(res.itSupportBean.reportdate);
      if(this.docForm.value.report = true){
        this.CCFlag = true;
      }
      else{
        this.CCFlag = false;
      }
     // let loacationtext = this.locationList.some(({locationList:id }) => id === res.scheduleMasterBean.location);
   

      this.docForm.patchValue({
        
       'reportdate': res.itSupportBean.reportdate,
       'reportdateObj':cdate,
        'uploadImg': res.itSupportBean.uploadImg,
        'asset':  parseInt(res.itSupportBean.asset),
        'assetlocation' :parseInt(res.itSupportBean.assetlocation),
        'reportedby' : res.itSupportBean.reportedby,
        'tickettype' : res.itSupportBean.tickettype,
        'ticketgroup' : res.itSupportBean.ticketgroup,
        'assignee' : res.itSupportBean.assignee,
        'priority' : res.itSupportBean.priority,
        'description' : res.itSupportBean.description,
        'report' : res.itSupportBean.report,
        'cc' : res.itSupportBean.cc,
        'support_id' : id,
        

     })

      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  update(){


    this.Itsupport = this.docForm.value;
    this.itsupportservice.scheduleUpdate(this.Itsupport,this.router,this.notificationService);
    this.router.navigate(['/helpdesk/itsupport/listitsupport']);


  }

 
  onCancel(){
  
    this.router.navigate(['/helpdesk/itsupport/listitsupport']);
  }

  validateEmail(event){
    this.httpService.get<any>(this.companyEmployeeService.uniqueValidateUrl + "?tableName=" + "employee" + "&columnName=" + "email_id" + "&columnValue=" + event).subscribe((res: any) => {
      if (res){
        this.docForm.controls['cc'].setErrors({ employee: true });
      }else{
       // this.docForm.controls['emailId'].setErrors(null);
      }
    });
  }

  
    
    }
    
  

