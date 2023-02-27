import { Component, OnInit } from '@angular/core';
import { FormArray,FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ExchangeMaster } from '../exchange-model';
import { ExchangeService } from '../exchange.service';
import { AssetService } from 'src/app/asset/asset-master/asset.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-exchange-master',
  templateUrl: './add-exchange-master.component.html',
  styleUrls: ['./add-exchange-master.component.sass']
})
export class AddExchangeMasterComponent implements OnInit {

  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;
  currencyListbasedCompany:[];
  companyId: string;
  branchId: string;

  exchangeMaster : ExchangeMaster;
  constructor(private fb: FormBuilder,
    private exchangeMasterService : ExchangeService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private cmnService: CommonService,
    private assetService: AssetService,

    private router:Router) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],


    

      exchangeratecode:  [moment().format('DD/MM/YYYY')],
      exchangeratecodeobj:  [moment().format('DD/MM/YYYY')],
      currency: [""],
      value: [""],
      date: [""],
      exchangeid: [""],
      id:[""],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId(),
      loginedUser: this.tokenStorage.getUserId(),

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


     this.companyId = this.tokenStorage.getCompanyId();

     this.httpService.get<any>(this.assetService.getCompanyBasedCurrency + "?userId=" + (this.companyId)).subscribe({
       next: (data) => {
         this.currencyListbasedCompany = data.salesOrderBean;
       },
       error: (error) => {
       }
     });
  }

  onSubmit(){
    this.exchangeMaster = this.docForm.value;
    console.log(this.exchangeMaster);
    if(this.docForm.valid){

    this.exchangeMasterService.addExchange(this.exchangeMaster).subscribe({
      next: (data) => {
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          this.router.navigate(['/master/exchange/listExchange']);
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Added...!!!",
            "bottom",
            "center"
          );
        }
      }
    });
  }
  }

  // Edit
  fetchDetails(id: any): void {
    this.httpService.get(this.exchangeMasterService.editExchangeMaster+"?id="+id).subscribe((res: any)=> {
      console.log(id);


      this.docForm.patchValue({

        'exchangeratecodeobj': res.exchangeMasterBean.exchangeratecode != null ? this.commonService.getDateObj(res.exchangeMasterBean.exchangeratecode) : "",
        'exchangeratecode': res.exchangeMasterBean.exchangeratecode,
        'currency': res.exchangeMasterBean.currency,
        'value': res.exchangeMasterBean.value,
     })
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  update(){
    if(this.docForm.valid){

    this.exchangeMaster = this.docForm.value;
    this.exchangeMasterService.exchangeMasterUpdate(this.exchangeMaster);
    this.showNotification(
      "snackbar-success",
      "Record Updated Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/exchange/listExchange']);
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right"
    );
  }
  }

  onCancel(){
     this.router.navigate(['/master/exchange/listExchange']);
  }

  reset(){
    if (!this.edit) {
    this.docForm = this.fb.group({
     
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId()

    });
  } else {
    this.fetchDetails(this.requestId);
  }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


  getDateString(event, inputFlag, index) {
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag == 'exchangeratecode') {
      this.docForm.patchValue({ exchangeratecode: cdate });
    }
  }

   

}


