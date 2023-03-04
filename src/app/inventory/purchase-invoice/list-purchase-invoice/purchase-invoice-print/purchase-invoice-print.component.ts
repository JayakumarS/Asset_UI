import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { PurchaseInvoiceService } from '../../purchase-invoice.service';

@Component({
  selector: 'app-purchase-invoice-print',
  templateUrl: './purchase-invoice-print.component.html',
  styleUrls: ['./purchase-invoice-print.component.sass']
})
export class PurchaseInvoicePrintComponent implements OnInit {


  beanValue = [];
  exampleDatabase: PurchaseInvoiceService | null;
  docForm: FormGroup;
  constructor(
    private router:Router, 
    private route:ActivatedRoute, 
    private httpService:HttpServiceService,  
    public purchaseInvoiceService: PurchaseInvoiceService,
    private fb: FormBuilder,
    private tokenStorage:TokenStorageService
    ) { }

  ngOnInit(): void {

    this.docForm = this.fb.group({
     
      purchaseInvoiceNo: [""],
      purchaseInvoiceDate: [""],
      vendorName:[""],
      currency: [""],
      actions: [""],
      companyId:parseInt(this.tokenStorage.getCompanyId()),
      branchId:parseInt(this.tokenStorage.getBranchId())
     
    });
    this.docForm.patchValue({
      'purchaseInvoiceNo':sessionStorage.getItem("purchaseInvoiceNo"),
      'purchaseInvoiceDate':sessionStorage.getItem("purchaseInvoiceDate"),
      'vendorName':sessionStorage.getItem("vendorName")
    })

    this.exampleDatabase=this.docForm.value;
    this.httpService.post(this.purchaseInvoiceService.getAllMasters, this.exampleDatabase).subscribe((res: any) => {
      this.beanValue=res.purchaseInvoiceList;
    });
  }

  printComponent(){

 
    let newWin;
    var content1 = document.getElementById('salesOrderdview').innerHTML;
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
   .header {
    background: #80808036 !important;
   }
    th{
      border: 1px solid black;  
      padding:0.5% !important;
      background: #80808036;
     }
     td{
      border: 1px solid black ;
     }
     .pd {
      padding: 5px;
     }
     .bold{
      font-weight : 700;
     }
     .center{
      display: flex;
      align-items: center;
      justify-content: center;
    }
</style>
        </head>

      <body onload="window.print();window.close()">${combined.outerHTML}</body>
      </html>`
          
         );
   newWin.document.close();

  }

  onCancel(){
    sessionStorage.setItem("item","");
    sessionStorage.setItem("item","");
    sessionStorage.setItem("item","");
   this.router.navigate(['/inventory/purchaseInvoice/listPurchaseInvoice']);
  }

}


