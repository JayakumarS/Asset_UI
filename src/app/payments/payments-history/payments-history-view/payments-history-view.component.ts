import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Payments } from '../../payments.model';
import { PaymentsHistoryService } from '../payments-history.service';
import { map } from "rxjs/operators";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payments-history',
  templateUrl: './payments-history-view.component.html',
  styleUrls: ['./payments-history-view.component.sass']
})
export class PaymentsHistoryComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = [
    "receiptno",
    "subscriptiontype",
    "orderid",
    "userid",
    "amount",
    "transactiondate",
  ];

  selection = new SelectionModel<Payments>(true, []);
  index: number;
  id: number;
  payments: Payments | null;
  billid : String;
  edit : boolean = false;
  docForm : FormGroup;
  payBill : any;

  constructor(
    private spinner: NgxSpinnerService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public paymentsHistoryService: PaymentsHistoryService,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    private tokenStorage: TokenStorageService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { 
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {

    
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.billid = params.id;
        this.edit = true;
        this.fetchDetails(this.billid);      
      }    

    });

    this.docForm = this.formBuilder.group({

      totalAmount : [""],
      actualPayment : [""],
      billDate : [""],
      paymentCode : [""],
      pendingPaymentList : this.formBuilder.array([
        this.formBuilder.group({
            receiptNo : [""],
            paymentId : [""],
            companyName : [""],
            companyId : [""],
            amountPaidByUser : [""],
            auditorCommission : [""],
        })
      ])
    });


  }

  refresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
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

  fetchDetails(billid){
    this.httpService.get(this.paymentsHistoryService.getPaidBillPrint + "?payCode=" + billid).subscribe((res: any) => {   
      this.payBill = res;
      this.docForm.patchValue({
        'totalAmount': res.billPaidList[0].actualPayment,  
        'billDate' : res.billPaidList[0].paymentDate,
        'paymentCode' : res.billPaidList[0].paymentCode,
     })
  
      let pendingPaymentList = this.docForm.controls.pendingPaymentList as FormArray;
      pendingPaymentList.removeAt(0);  
      
       res.billPaidList.forEach(element => {
       let pendingPaymentList = this.docForm.controls.pendingPaymentList as FormArray;
       let arraylen = pendingPaymentList.length;
       let newUsergroup: FormGroup = this.formBuilder.group({
        receiptNo : [element.receiptNo],
        paymentId : [element.paymentId],
        companyName : [element.companyName],
        companyId : [element.companyId],
        amountPaidByUser : [element.amountPaidByUser],
        auditorCommission : [element.auditorCommission],
     })
     pendingPaymentList.insert(arraylen,newUsergroup);
       
     });
   
    
  });
  }

  printCall() {
    const button = document.getElementById('printBtn');

    button?.addEventListener('click', function handleClick(event) {
      console.log('button clicked');
      console.log(event);
      console.log(event.target);
    });
  }
  printComponent() {
    if(this.payBill) {
     let newWin;
     var content1 = document.getElementById('paymnetView').innerHTML;
     var combined = document.createElement('div');
     combined.innerHTML = content1; // a little spacing
     combined.id = 'new';
     newWin= window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
     newWin.document.open();
         newWin.document.write(`
         <html>
         <head>
         <title>Print tab</title>
               
         <meta charset="utf-8">
         <link rel="icon" type="image/x-icon" href="../favicion.png">
         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
         <script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
         <script src="https://cdnjs.cloudflare.com/ajax/libs/Base64/1.1.0/base64.min.js"></script>
         <style type="text/css">
     input {
         outline: 0;
         border-width: 0 0 2px;
         width: 100px;
     }
     
     @page {
         size: auto;
         margin: 5mm;
     }
     
     @media print {
       .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
         float: left;
    }
    .col-md-12 {
         width: 100%;
    }
    .col-md-11 {
         width: 91.66666667%;
    }
    .col-md-10 {
         width: 83.33333333%;
    }
    .col-md-9 {
         width: 75%;
    }
    .col-md-8 {
         width: 66.66666667%;
    }
    .col-md-7 {
         width: 58.33333333%;
    }
    .col-md-6 {
         width: 50%;
    }
    .col-md-5 {
         width: 41.66666667%;
    }
    .col-md-4 {
         width: 33.33333333%;
    }
    .col-md-3 {
         width: 25%;
    }
    .col-md-2 {
         width: 16.66666667%;
    }
    .col-md-1 {
         width: 8.33333333%;
    }
    table {
     border: 1px solid black;
 }
 th, td {
     border: 1px solid black;
 }
 img {
   -webkit-print-color-adjust: exact;
 }
     }
 </style>
         </head>
 
       <body onload="window.print();window.close()">${combined.outerHTML}</body>
       </html>`
           
          );
    newWin.document.close();
   } else {
     this.fetchDetails(this.billid);
   }
   }
 
   navtolist() {
     this.router.navigate(['/payments/paymentsHistory/payment-history-list']);
 }
 onCancel() {
   this.router.navigate(['/payments/paymentsHistory/payment-history-list']);
 }
 }
 

 

