import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AddAssetService } from '../../employees/add-asset.service'; 
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MainResultBean } from '../main-result-bean'; 
import { main } from '../main-model';
import { MainService } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAsset } from '../../employees/addAsset-model';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.sass']
})
export class InventoryComponent implements OnInit {

  categoryDdList=[];
  docForm: FormGroup;
  Main: main;
 
  constructor(private fb: FormBuilder,private httpService: HttpServiceService,public router:Router,
    private addAssetService:AddAssetService,public notificationService:NotificationService,
    private snackBar: MatSnackBar,private mainService:MainService) { 
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      
      item: ["", [Validators.required]],
      invCategory:[""],
      itemCode:[""],
      price:[""],
      unit:[""],
      invDescription:[""],
      invUploadFiles:[""],
      hsnCode:[""],
      isReceivable:[""],
      imgUploadUrl:[""]

    });
  }

  ngOnInit(): void {

    
     // category dropdown
     this.httpService.get<MainResultBean>(this.addAssetService.categoryDropdownList).subscribe(
      (data) => {
       this.categoryDdList = data.categoryDropdown;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  // onSubmit() {
  //   console.log("Form Value", this.docForm.value);
  //   this.addInventory = this.docForm.value;
  //   this.mainService.addInventory(this.addInventory,this.router,this.notificationService);
  //   //this.router.navigate(['/admin/country-Master/list-CountryMaster']);

  // }


  // onSubmit() {
  //   console.log("Form Value", this.docForm.value);
  //   this.addAsset = this.docForm.value;
  //   console.log(this.addAsset);
  //   this.addAssetService.addInventory(this.addAsset,this.router,this.notificationService);
   
  //   //this.router.navigate(['/admin/country-Master/list-CountryMaster']);
  // }

  onSubmit() {
    console.log("Form Value", this.docForm.value);
    this.Main = this.docForm.value;
   
    this.addAssetService.addInventory(this.Main,this.router,this.notificationService);
   
    //this.router.navigate(['/admin/country-Master/list-CountryMaster']);
  }



  

  // File upload
getCreditFile(event) {
  var docfile = event.target.files[0];
  var fileExtension = docfile.name;
  var frmData: FormData = new FormData();
  frmData.append("file", docfile);
  frmData.append("fileName",fileExtension);
  console.log(frmData);
  
  // var data = this.httpService.postData(this.fileUploadService.addFiles,frmData);
  // console.log(data);
  
  this.httpService.post<any>(this.addAssetService.addAssetUploadFiles, frmData).subscribe(data => {
      console.log(data);
      if(data.success){
        this.docForm.patchValue({
          'imgUploadUrl': data.filePath     
         
       })
      }
      else{
        this.showNotification(
          "snackbar-success",
          "Edit Record Successfully...!!!",
          "bottom",
          "center"
        );

        
      }
      
      },
      (err: HttpErrorResponse) => {
        
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
