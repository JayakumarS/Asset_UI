import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsageMonitor } from '../usageMonitor-model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsageMonitorService } from '../usage-monitor.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-add-usage-monitor',
  templateUrl: './add-usage-monitor.component.html',
  styleUrls: ['./add-usage-monitor.component.sass'],
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
export class AddUsageMonitorComponent implements OnInit {

  usageMonitor : UsageMonitor;
  itemTypeList = [];
  docForm: FormGroup;
  locationDdList = [];
  userDdList=[];
  companyId:any
  private  acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]
  filePathUrl: string;
  edit: any;
  requestId: any;
  spinner: any;
  startFlag: boolean = false;
  endFlag: boolean = false;

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private tokenStorage: TokenStorageService,
    private httpService: HttpServiceService,private usageMonitorService: UsageMonitorService,
    private commonService: CommonService,
    private cmnService:CommonService,
    private router:Router,public route: ActivatedRoute,
  ) { 
    this.docForm = this.fb.group({
      asset:[""],
      location:[""],
      occurence:[""],
      remainder:[""],
      assignee:["",[Validators.required]],
      uploadFile:[""],
      startdate:[""],
      startdateObj:[""],
      enddate:[""],
      enddateObj:[""],
      description:[""],
      cc:[""],

      usageMonitorDtlObjBean: this.fb.array([
        this.fb.group({
          meter:[""],
          feedValue:[""],
          multiplicationFactor:[""],
          unitRate:[""],
          recordingTime:[""],
          additionUnit:[""],
         }) 
      ]) 
      
    })
    
  }


  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    let hdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='startdate'){
      this.docForm.patchValue({startdate:cdate});
      this.startFlag=true;
    }
    else if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:hdate});
      this.endFlag=true;
    }
    // else if(inputFlag=='expectedDate'){
    //   this.docForm.patchValue({expectedDate:cdate});
    // }
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



    //Item Type Dropdown List
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 6).subscribe({
      next: (data) => {
        this.itemTypeList = data;
        this.docForm.patchValue({
          'itemType': 15
        });
      },
      error: (error) => {
      }
    });

     // Location dropdown
     this.companyId=this.tokenStorage.getCompanyId();
     this.httpService.get<any>(this.commonService.getLocationDropdown+"?companyId="+this.companyId).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    });
    
   // User dropdown
   this.companyId=this.tokenStorage.getCompanyId();
   this.httpService.get<any>(this.commonService.getAdminDropdown+"?companyId="+this.companyId).subscribe({
    next: (data) => {
      this.userDdList = data;
    },
    error: (error) => {

    }
  });
  }

  fetchDetails(usage_id: any): void {
    const obj = {
      editId: usage_id
    }
  
    this.usageMonitorService.editCustomer(obj).subscribe({
      next: (res) => {
        this.docForm.patchValue({
        'asset': res.usageMonitorBean.asset,
        'location': res.usageMonitorBean.location,
        'occurence': res.usageMonitorBean.occurence,
        'remainder': res.usageMonitorBean.remainder,
        'assignee': res.usageMonitorBean.assignee,
        'uploadFile' : res.usageMonitorBean.uploadFile,
        'startdateObj': res.usageMonitorBean.startdate,
        'startdate': res.usageMonitorBean.startdate,
        'enddateObj': res.usageMonitorBean.enddate,
        'enddate': res.usageMonitorBean.enddate,
        'description': res.usageMonitorBean.description,
        'cc': res.usageMonitorBean.cc,
      })
        if (res.usageMonitorDtlObjBean != null && res.usageMonitorDtlObjBean.length >= 1) {
        let usageMonitorArray = this.docForm.controls.usageMonitorDtlObjBean as FormArray;
        usageMonitorArray.clear();
        res.usageMonitorDtlObjBean.forEach(element => {
          let usageMonitorArray = this.docForm.controls.usageMonitorDtlObjBean as FormArray;
          let arraylen = usageMonitorArray.length;
          let newUsergroup: FormGroup = this.fb.group({
            meter: [ element.meter],
            feedValue: [ element.feedValue],
            multiplicationFactor: [ element.multiplicationFactor],
            unitRate: [ element.unitRate],
            recordingTime: [ element.recordingTime],
            additionUnit: [ element.additionUnit],

          })
          usageMonitorArray.insert(arraylen, newUsergroup);
        });
      }
  
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
  }

  removeRowSelf(index){
    let dtlArray = this.docForm.controls.usageMonitorDtlObjBean as FormArray;
    if(index != 0){
    dtlArray.removeAt(index);
    }
  
  }

  addRowSelf(){
    let dtlArray = this.docForm.controls.usageMonitorDtlObjBean as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      meter:[""],
      feedValue:[""],
      multiplicationFactor:[""],
      unitRate:[""],
      recordingTime:[""],
      additionUnit:[""],
    })
    dtlArray.insert(arraylen,newUsergroup);
  
  }

  onSubmit(){

    if(this.docForm.valid){
    this.usageMonitor = this.docForm.value;
    console.log(this.usageMonitor);
    this.usageMonitorService.save(this.usageMonitor);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/usage/usageMonitor/listUsageMonitor']);
    
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right"
    );
  }
  
}

update(){
  // this.usageMonitor = this.docForm.value;
  // this.spinner.show();
  // this.usageMonitorService.updateUsage(this.usageMonitor).subscribe({
  //     next: (data) => {
  //       this.spinner.hide();
  //       if (data.success) {
  //         this.showNotification(
  //           "snackbar-success",
  //           "Edit Record Successfully",
  //           "bottom",
  //           "center"
  //         );
  //         this.cancel();
  //       } else {
  //         this.showNotification(
  //           "snackbar-danger",
  //           "Not Updated Successfully...!!!",
  //           "bottom",
  //           "center"
  //         );
  //       }
  //     },
  //     error: (error) => {
  //       this.spinner.hide();
  //       this.showNotification(
  //         "snackbar-danger",
  //         error.message + "...!!!",
  //         "bottom",
  //         "center"
  //       );
  //     }
  //   });
   
   this.usageMonitor = this.docForm.value;
   if(this.startFlag==true){
    this.getDateString

   }else if(this.endFlag==true){
    this.getDateString
   }else{
    
   }
    this.usageMonitor.usage_id = this.requestId;
    this.usageMonitorService.updateUsage(this.usageMonitor);
    this.showNotification(
      "snackbar-success",
      "Record Updated Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/usage/usageMonitor/listUsageMonitor']);

  }

cancel(){
this.router.navigate(['/usage/usageMonitor/listUsageMonitor/'])
}
  
reset(){
  if (!this.edit) {
    this.docForm.reset();
    this.docForm.patchValue({
      asset:[""],
      location:[""],
      occurence:[""],
      remainder:[""],
      assignee:[""],
      uploadFile:[""],
      startdate:[""],
      startdateObj:[""],
      enddate:[""],
      enddateObj:[""],
      description:[""],
      cc:[""],
    })
  } else {
    this.fetchDetails(this.requestId);
  }


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

    this.httpService.post<any>(this.commonService.commonUploadFile, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            this.docForm.patchValue({
              'uploadFile': data.filePath
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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
