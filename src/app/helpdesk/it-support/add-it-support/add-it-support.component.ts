import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  docForm: FormGroup;
  itsupport: Itsupport;
  assetnamelist:[""]
  assetlocationlist:[""]
 
  constructor(private cmnService:CommonService,private fb: FormBuilder,private httpService: HttpServiceService,
    private  itsupportservice: Itsupportservice, private commonService: CommonService,
    public router:Router,private snackBar: MatSnackBar,
    public dialog: MatDialog,public route: ActivatedRoute) { 
    this.docForm = this.fb.group({
    
      reportdate:[""],
      reportdateObj:[""],
      uploadImg:[""],
      asset:[""],
      assetlocation:[""],
      reportedby:[""],
      tickettype:[""],
      ticketgroup:[""],
      assignee:[""],
      priority:[""],
      cc:[""],
      description:[""],
      report:[""]


   
    });
    }
  ngOnInit(): void {
  
  
   // assetname dropdown
   this.httpService.get<any>(this.commonService.getassetname).subscribe({
    next: (data) => {
      this.assetnamelist = data;
    },
    error: (error) => {

    }
  }
  );

    
  }
  onsubmit(){
    this.itsupport = this.docForm.value;
      console.log(this.itsupport);
      this.itsupportservice.addassetticket(this.itsupport);
    
      this.router.navigate(['/helpdesk/itsupport/listitsupport']);
  
}
fetchlocationdetails(salesQuoteNo: any): void {
  this.httpService.get(this.itsupportservice.fetchassetlocaton + "?workOrder=" + salesQuoteNo).subscribe((res: any) => {
    console.log(salesQuoteNo);

     this.docForm.patchValue({
       'customer': res.assetlocation.customer,
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

  }

  refresh(){

  }
  reset(){

  }
  onCancel(){

  }

  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='reportdate'){
      this.docForm.patchValue({reportdate:cdate});
    }
  }

  getCreditFile(event) {
  //   var docfile = event.target.files[0];
  //   var fileExtension = docfile.name;
  //   var frmData: FormData = new FormData();
  //   frmData.append("file", docfile);
  //   frmData.append("fileName",fileExtension);
  //   console.log(frmData);
    
  //   // var data = this.httpService.postData(this.fileUploadService.addFiles,frmData);
  //   // console.log(data);
    
  //   this.httpService.post<any>(this.auditService.addAssetUploadFiles, frmData).subscribe(data => {
  //       console.log(data);
  //       if(data.success){
  //         this.Formdoc.patchValue({
  //           'auditfile': data.filePath     
           
  //        })
  //       }
  //       else{
  //         this.showNotification(
  //           "snackbar-success",
  //           "Edit Record Successfully...!!!",
  //           "bottom",
  //           "center"
  //         );
  
          
  //       }
        
  //       },
  //       (err: HttpErrorResponse) => {
          
  //     });
  
  //   }
 
  }
    
    }
    
  

