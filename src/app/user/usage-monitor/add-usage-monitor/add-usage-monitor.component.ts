import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-usage-monitor',
  templateUrl: './add-usage-monitor.component.html',
  styleUrls: ['./add-usage-monitor.component.sass']
})
export class AddUsageMonitorComponent implements OnInit {

  itemTypeList = [];
  docForm: FormGroup;
  locationDdList = [];
  userDdList=[];
  private acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]
  filePathUrl: string;

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private cmnService:CommonService,
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
