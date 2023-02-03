import { DataSource } from '@angular/cdk/collections';
import { SelectionModel } from "@angular/cdk/collections";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { PaymentHistoryAdd } from './payment-history-add.model';
import { PaymentsHistoryAddService } from './payments-history-add.service';

@Component({
  selector: 'app-payment-history-add',
  templateUrl: './payment-history-add.component.html',
  styleUrls: ['./payment-history-add.component.sass']
})
export class PaymentHistoryAddComponent extends UnsubscribeOnDestroyAdapter implements OnInit  {
  displayedColumns = [
    "select",
    "receiptNo",
    "paymentId",
    "companyName",
    "amountPaidByUser",
    "auditorCommission"
  ];

  selection = new SelectionModel<PaymentHistoryAdd>(true, []);

  docForm: FormGroup;

  checkedIDs: any = [];
  totalAmount: number = 0;
  actualPayment : number = 0;
  saveData : any;
  rowsPresent : boolean = false;
  currency : any;
  auditorList : any = [];

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public paymentAddService: PaymentsHistoryAddService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    
  )
  {
    super();
  } 

  
   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;
   @ViewChild("filter", { static: true }) filter: ElementRef;
   @ViewChild(MatMenuTrigger)
   contextMenu: MatMenuTrigger;
   contextMenuPosition = { x: "0px", y: "0px" };
 
 
   ngOnInit(): void {

    this.docForm = this.formBuilder.group({

      totalAmount : [""],
      actualPayment : [""],
      auditor : [""],
      userId : this.tokenStorage.getUserId(),
      pendingPaymentList : this.formBuilder.array([
        this.formBuilder.group({
            selectAll: [""],
            receiptNo : [""],
            paymentId : [""],
            companyName : [""],
            companyId : [""],
            amountPaidByUser : [""],
            auditorCommission : [""],
            auditorId : [""],
            auditorName : [""],
        })
      ])
    });

    this.getDetails();

}

changeAuditor(auditorid){
  this.fetchDetails(auditorid);
}
    
  getDetails(){
    this.httpService.get<any>(this.paymentAddService.getAuditorList).subscribe(res => {
      if(res.success){        
        this.auditorList = res.auditorList;
      }
    });
  }

  
   
  refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
fetchDetails (auditorid : any) {
  this.docForm = this.formBuilder.group({

    totalAmount : [""],
    actualPayment : [""],
    auditor : [""],
    currency : [""],
    userId : this.tokenStorage.getUserId(),
    pendingPaymentList : this.formBuilder.array([
      this.formBuilder.group({
          selectAll: [""],
          receiptNo : [""],
          paymentId : [""],
          companyName : [""],
          companyId : [""],
          amountPaidByUser : [""],
          auditorCommission : [""],
          auditorId : [""],
          auditorName : [""],
      })
    ])
  });

  this.httpService.get(this.paymentAddService.getAllPendingPayments+"?auditorId="+auditorid).subscribe((res: any) => {   
   if (res.totalAmount > 0){
    this.rowsPresent = true;
   }else {
    this.rowsPresent = false;
   }

    this.docForm.patchValue({
      'totalAmount': res.totalAmount,
      'currency' : res.currencySymbol,
       'userId' : this.tokenStorage.getUserId(),
     
   })

    let pendingPaymentList = this.docForm.controls.pendingPaymentList as FormArray;
    pendingPaymentList.removeAt(0);  
    
     res.billPendingList.forEach(element => {
     let pendingPaymentList = this.docForm.controls.pendingPaymentList as FormArray;
     let arraylen = pendingPaymentList.length;
     let newUsergroup: FormGroup = this.formBuilder.group({
      selectAll : [""],
      receiptNo : [element.receiptNo],
      paymentId : [element.paymentId],
      companyName : [element.companyName],
      companyId : [element.companyId],
      amountPaidByUser : [element.amountPaidByUser],
      auditorCommission : [element.auditorCommission],
      auditorId : [element.auditorId],
      auditorName : [element.auditorName],
   })
   pendingPaymentList.insert(arraylen,newUsergroup);
     
   });
 
  
});
}
  
  onCount(selectAll,obj){
    if (selectAll) {
      this.getValue(obj);
  } else if (!selectAll) {
    this.getValue(obj);
  }
}

onCancel(){
  this.router.navigate(['/payments/paymentsHistory/payment-history-list']);
}
  checkAll (event,collection) {
    const checked = event.target.checked;
    var i=0;
    let DtlArray = this.docForm.controls.pendingPaymentList as FormArray;
    if (checked) {
          collection.forEach(element => {
            DtlArray.at(i).patchValue({selectAll:true});
            i++;
        });
      
      } else {
        collection.forEach(element => {
          DtlArray.at(i).patchValue({selectAll:false});
          i++;
        });
     
      }
      this.getValue(collection);

  }

  getValue = function(collection){
    this.actualPayment = 0;
    let DtlArray = this.docForm.controls.pendingPaymentList as FormArray;
    collection.forEach((element, index) => {
      if (collection[index].value.selectAll == true){        
        if ((this.actualPayment > 0) && (this.actualPayment != collection[index].value.auditorCommission))
          this.actualPayment += collection[index].value.auditorCommission;
        else 
        this.actualPayment += collection[index].value.auditorCommission;
      }
    });

 

  //   this.httpService.get(this.paymentAddService.getAllPendingPayments).subscribe((res: any) => {
  //     this.totalAmount = res.totalAmount;
  //     this.currency = res.currencySymbol;

  // });
    
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }



  savePayment (docForm){
    docForm.patchValue({
      'actualPayment': parseFloat(this.actualPayment.toFixed(2)),  
     
   })

  this.saveData = docForm.value;
  this.httpService.post<any>(this.paymentAddService.savePaymentDetails, this.saveData).subscribe(data => {
    console.log(data);
    if(data.success == true){
      this.showNotification(
        "snackbar-success",
        "Saved Succesfully!",
        "top",
        "right"
      );
      this.router.navigate(['/payments/paymentsHistory/payment-history-list']);
    } else{
      this.showNotification(
        "snackbar-danger",
        "Could not save Results!",
        "top",
        "right"
      );
    } 
  },
    (err: HttpErrorResponse) => {
      this.showNotification(
        "snackbar-success",
        "Error",
        "bottom",
        "center"
      );
  });
  
}

  
}
