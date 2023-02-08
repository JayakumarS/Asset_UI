import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ScheduledauditsService } from 'src/app/audit/scheduledaudits/scheduledaudits.service'; 
import { SalesQuote } from 'src/app/marketing/sales-quote/sales-quote.model';


@Component({
  selector: 'app-print-audit-report',
  templateUrl: './print-audit-report.component.html',
  styleUrls: ['./print-audit-report.component.sass']
})
export class PrintAuditReportComponent implements  OnInit {
  roleId: any;
  requestId:any;
  auditDetails:any;
  scheduledAuditDetailsList:any;
  bomModel:SalesQuote;
  
  // For Encrypt and Decrypt
  decryptRequestId: any;
   logoImg: any;


  constructor( public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public scheduledauditsService: ScheduledauditsService,
    public dialog: MatDialog,
    public tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void  {
    this.roleId=this.tokenStorage.getRoleId();
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.fetchDetails(this.requestId) ;
      }
     });
  }

  fetchDetails(id: any): void {
    const obj = {
      editId: id,
      companyId: this.tokenStorage.getCompanyId()
    }
    this.spinner.show();
    this.scheduledauditsService.editAudit(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        if(res != null){
          this.auditDetails=res?.scheduleAudit;
          if (res?.scheduleAuditDetailList != null && res?.scheduleAuditDetailList.length >= 1) {
            this.scheduledAuditDetailsList=res?.scheduleAuditDetailList;
          }
        }
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
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
   if(this.bomModel) {
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
    this.fetchDetails(this.requestId);
  }
  }

  navtolist() {
    this.router.navigate(['/marketing/salesOrder/listSalesOrder']);
}
onCancel() {
  this.router.navigate(['/asset/auditReport/listAuditReport']);
}
}

