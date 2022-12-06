import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerMasterService } from '../customer-master.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomerMaster } from '../customer-master.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.sass']
})
export class AddCustomerComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  cusMasterData =[];
  customerMaster:CustomerMaster;
  detailRowData = new DetailRowComponent;
  requestId: number;
  edit: boolean=false;
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
    private customerMasterService:CustomerMasterService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      country: ["", [Validators.required]],
      city: ["", [Validators.required]],
      territory: ["", [Validators.required]],
      salesPerson: ["", [Validators.required]],
      addressOfCus: ["", [Validators.required]],
      business: ["", [Validators.required]],
      stp: ["", [Validators.required]],
      organisationName: ["", [Validators.required]],
      zipCode:["", [Validators.required]],
      shortName: ["", [Validators.required]],
      cusWebsite: ["", [Validators.required]],
      companyRegn: ["", [Validators.required]],
      keyName: ["", [Validators.required]],
      keyNumber: ["", [Validators.required]],
      transactionGST: ["", [Validators.required]],
      vatNumber: ["", [Validators.required]],
      panNumber: ["", [Validators.required]],
      paymentCenter:["", [Validators.required]],
      creditLimit: ["", [Validators.required]],
      creditUsd: ["", [Validators.required]],
      creditDays: ["", [Validators.required]],
      keymail: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      notificationMail: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      invoiceMail: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      creditAgreement: [""],
      designation:[""],
      kycDoc:[""],
      exemptionDoc:[""],
      nonGstDoc:[""],
      cusCode: [""]
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
  onSubmit() {
    this.customerMaster = this.docForm.value;
    console.log(this.customerMaster);
    this.customerMasterService.addCustomerMaster(this.customerMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/crm/customerMaster/listCustomer']);
  }

  fetchDetails(cusCode: any): void {
    this.httpService.get(this.customerMasterService.editCustomermaster+"?customer="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'cusCode': res.customerMasterBean.cusCode,
        'keyName': res.customerMasterBean.keyName,
        'country': res.customerMasterBean.country,
        'city': res.customerMasterBean.city,
        'territory': res.customerMasterBean.territory,
        'salesPerson': res.customerMasterBean.salesPerson,
        'addressOfCus': res.customerMasterBean.addressOfCus,
        'business': res.customerMasterBean.business,
        'stp': res.customerMasterBean.stp,
        'organisationName': res.customerMasterBean.organisationName,
        'zipCode': res.customerMasterBean.zipCode,
        'shortName': res.customerMasterBean.shortName,
        'cusWebsite': res.customerMasterBean.cusWebsite,
        'companyRegn': res.customerMasterBean.companyRegn,
        'keyNumber': res.customerMasterBean.keyNumber,
        'keymail': res.customerMasterBean.keymail,
        'transactionGST': res.customerMasterBean.transactionGST,
        'vatNumber': res.customerMasterBean.vatNumber,
        'panNumber': res.customerMasterBean.panNumber,
        'notificationMail': res.customerMasterBean.notificationMail,
        'invoiceMail': res.customerMasterBean.invoiceMail,
        'paymentCenter': res.customerMasterBean.paymentCenter,
        'creditLimit': res.customerMasterBean.creditLimit,
        'creditUsd': res.customerMasterBean.creditUsd,
        'creditDays': res.customerMasterBean.creditDays,
     
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){

    this.customerMaster = this.docForm.value;
    this.customerMasterService.customerMasterUpdate(this.customerMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/crm/customerMaster/listCustomer']);

  }

  reset(){}

  addRow(){
    this.detailRowData=new DetailRowComponent()
    this.dataarray.push(this.detailRowData)

  }
  removeRow(index){
    this.dataarray.splice(index, 1);
  }
  onCancel(){
    this.router.navigate(['/crm/customerMaster/listCustomer']);
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
