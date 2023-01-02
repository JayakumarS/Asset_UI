import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Itsupportservice } from '../it-support.service';

@Component({
  selector: 'app-add-it-support',
  templateUrl: './add-it-support.component.html',
  styleUrls: ['./add-it-support.component.sass']
})
export class AddItSupportComponent implements OnInit {
  docForm: FormGroup;
  assetnamelist:[""]
 
  constructor(private cmnService:CommonService,private fb: FormBuilder,private httpService: HttpServiceService,
    private  itsupportservice: Itsupportservice, private commonService: CommonService,
    public router:Router,private snackBar: MatSnackBar,public notificationService:NotificationService,
    public dialog: MatDialog,public route: ActivatedRoute) { 
    this.docForm = this.fb.group({
    
      reportdate:[""],
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
  submit(){

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
    if(inputFlag=='startdate'){
      this.docForm.patchValue({startdate:cdate});
    }
    else if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:cdate});
    }
    // else if(inputFlag=='expectedDate'){
    //   this.docForm.patchValue({expectedDate:cdate});
    // }
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
  // showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
  //   throw new Error('Method not implemented.');
  }
    
    }
    
  

