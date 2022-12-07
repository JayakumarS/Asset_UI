import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CommodityService } from '../commodity.service';
import { Commodity } from '../commodity.model';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';





@Component({
  selector: 'app-add-commodity',
  templateUrl: './add-commodity.component.html',
  styleUrls: ['./add-commodity.component.sass']
})
export class AddCommodityComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  commodityMaster : Commodity;
  requestId: number;
  edit:boolean=false;
  constructor(private fb: FormBuilder,private router:Router,
    public route: ActivatedRoute,private snackBar: MatSnackBar,
    private commodityService: CommodityService,private httpService: HttpServiceService) {
    this.docForm = this.fb.group({
      
      //AssetChek
      vendorId:[""],
      vendorName:["",[Validators.required]],
      vendorShortName:["",[Validators.required]],
      vendorAddress:["",[Validators.required]],
      vendorCountry:["",[Validators.required]],
      vendorEmail:["",[Validators.required]],
      currency:["",[Validators.required]],
      vendorContact:["",[Validators.required]],
      vendorPhoneNumber:["",[Validators.required]],



    });
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
  }

  onSubmit(){
    if(this.docForm.valid){
    this.commodityMaster = this.docForm.value;
    console.log(this.commodityMaster);
    this.commodityService.addCommodity(this.commodityMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
     this.router.navigate(['/master/commodity/listCommodity']);
    }
  }

  fetchDetails(vendorId: any): void {
    this.httpService.get(this.commodityService.editcommodity+"?commodityMaster="+vendorId).subscribe((res: any)=> {
      console.log(vendorId);

      this.docForm.patchValue({
        'vendorId': res.countryMasterBean.vendorId,
        'vendorName': res.countryMasterBean.vendorName,
        'vendorCountry': res.countryMasterBean.vendorCountry,
        'currency': res.countryMasterBean.currency,
        'vendorPhoneNumber': res.countryMasterBean.vendorPhoneNumber,
        'vendorShortName' : res.countryMasterBean.vendorShortName,
        'vendorAddress': res.countryMasterBean.vendorAddress,
        'vendorEmail':res.countryMasterBean.vendorEmail,
        'vendorContact':res.countryMasterBean.vendorContact
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
  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  update(){
    this.commodityMaster = this.docForm.value;
    this.commodityService.updateCommodity(this.commodityMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/commodity/listCommodity']);

  }

  onCancel(){
    this.router.navigate(['/master/commodity/listCommodity']);
  
  }
  
  reset(){
    this.docForm = this.fb.group({
      //AssetChek
      vendorName:[""],
      vendorShortName:[""],
      vendorAddress:[""],
      vendorCountry:[""],
      vendorEmail:[""],
      currency:[""],
      vendorContact:[""],
      vendorPhoneNumber:[""]
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
