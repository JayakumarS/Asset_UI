import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Brand } from '../brand.model';
import { BrandMasterService } from '../brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.sass']
})
export class AddBrandComponent implements OnInit {
  docForm: FormGroup

  edit:boolean=false;
  requestId: any;
  brand: Brand;
  brandMasterService: BrandMasterService

  constructor(private fb: FormBuilder,
   
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,private tokenStorage: TokenStorageService,
    private notificationService: NotificationService) { 
  this.docForm = this.fb.group({
    brand: [""],
    Description: [""],
     isactive:[""]
  });
}
  ngOnInit(): void {
    this.docForm = this.fb.group({
      brand: [""],
      Description: [""],
       isactive:[""]
    });

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
    });
  }
  fetchDetails(requestId: any) {
    throw new Error('Method not implemented.');
  }
  onSubmit(){
    this.brand = this.docForm.value;
    console.log(this.brand);
    if(this.docForm.valid){
      if(this.docForm.value.isactive==true)
      {
       this.docForm.value.isactive="True"
      }
      else if(this.docForm.value.isactive==false)
      {
       this.docForm.value.isactive="False"
      } 
       this.brand = this.docForm.value;
     console.log(this.brand);
     this.brandMasterService.addbrand(this.brand,this.router);
     this.showNotification(
       "snackbar-success",
       "Successfully Added...!!!",
       "bottom",
       "center"
     );
     }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
     
  }

  reset(){

  }
  onCancel(){

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

