import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsageMonitor } from '../usageMonitor-model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsageMonitorService } from '../usage-monitor.service';

@Component({
  selector: 'app-add-usage-monitor',
  templateUrl: './add-usage-monitor.component.html',
  styleUrls: ['./add-usage-monitor.component.sass']
})
export class AddUsageMonitorComponent implements OnInit {

  usageMonitor : UsageMonitor;
  itemTypeList = [];
  docForm: FormGroup;
  locationDdList = [];
  userDdList=[];
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]
  filePathUrl: string;
  edit: any;
  requestId: any;

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,
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
     this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    });
    
   // User dropdown
   this.httpService.get<any>(this.commonService.getAdminDropdown).subscribe({
    next: (data) => {
      this.userDdList = data;
    },
    error: (error) => {

    }
  });
  }

  fetchDetails(id:any){
    
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
