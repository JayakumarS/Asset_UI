import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from '@angular/router';
import { main } from 'src/app/admin/dashboard/main-model';
import { AddAssetService } from 'src/app/admin/employees/add-asset.service';
import { MainService } from 'src/app/admin/dashboard/main.service';
import { MainResultBean } from 'src/app/admin/dashboard/main-result-bean';




@Component({
  selector: 'app-add-in-stock',
  templateUrl: './add-in-stock.component.html',
  styleUrls: ['./add-in-stock.component.sass']
})
export class AddInStockComponent implements OnInit {

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
