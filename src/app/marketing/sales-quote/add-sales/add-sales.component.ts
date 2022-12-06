import { Component, OnInit } from '@angular/core';
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SalesQuote } from '../sales-quote.model';
import { SalesQuoteService } from '../sales-quote.service';
import { SalesQuoteResultBean } from '../sales-quote-result-bean';
import * as moment from 'moment';
@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.sass']
})
export class AddSalesComponent implements OnInit {
  docForm: FormGroup;
  salesQuote:SalesQuote;
  hide3 = true;
  agree3 = false;
  requestId: number;
  dataarray=[];
  dataarray1=[];
  cusMasterData =[];
  salesEntryData=[];
  minDate: any;
  salesDetailRowData = new SalesEntryDetailRowComponent;
  maxDate = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
  edit: boolean=false;
  
  

  // authService: any;
  

  constructor(private fb: FormBuilder,private authService: AuthService,public router:Router,
    private salesQuoteService : SalesQuoteService,public route: ActivatedRoute,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      customer: ["", [Validators.required]],
      validFrom: ["", [Validators.required]],
      validTo: ["", [Validators.required]],
      termCondition: ["", [Validators.required]],
      // emailId: [
      //        "",
      //        [Validators.required, Validators.email, Validators.minLength(5)],
      //      ],
      // personMet: [""],
      // assignTo: [""],
      
      expectedDate:[""],
      currency:[""],
      countValue:[""]
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
    this.dataarray.push(this.salesDetailRowData)
    this.dataarray1.push(this.salesDetailRowData)
    this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.dataarray)
    this.salesEntryData.push(this.dataarray1)
  }

   // Edit
   fetchDetails(countValue: any): void {
    this.httpService.get(this.salesQuoteService.editSalesQuote+"?salesQuote="+countValue).subscribe((res: any)=> {
      console.log(countValue);

      this.docForm.patchValue({
        'customer': res.salesQuoteBean.customer,
        'validFrom': res.salesQuoteBean.validFrom,
        'validTo': res.salesQuoteBean.validTo,
        'termCondition': res.salesQuoteBean.termCondition,
        'currency': res.salesQuoteBean.currency,
        'expectedDate': res.salesQuoteBean.expectedDate,
        'countValue': res.salesQuoteBean.countValue,
        
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

  onSubmit() {
    this.salesQuote = this.docForm.value;
    console.log(this.salesQuote);
    this.salesQuoteService.addSalesQuote(this.salesQuote);
    // logger msg
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
   this.router.navigate(['/marketing/salesQuote/listSalesQuote']);

  }

  update(){
    this.docForm.patchValue({
      'countValue': this.requestId,    
   })
    
    this.salesQuote = this.docForm.value;
    this.salesQuoteService.UpdateSalesQuote(this.salesQuote);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/marketing/salesQuote/listSalesQuote']);

  }
  addRow(){
    this.salesDetailRowData=new SalesEntryDetailRowComponent()
    this.dataarray.push(this.salesDetailRowData)

  }
  removeRow(index){
    this.dataarray.splice(index, 1);
  }

  addRow1(){
    this.salesDetailRowData=new SalesEntryDetailRowComponent()
    this.dataarray1.push(this.salesDetailRowData)

  }
  onCancel(){
    this.router.navigate(['/marketing/salesQuote/listSalesQuote']);
  }
  reset(){}
  removeRow1(index){
    this.dataarray1.splice(index, 1);
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
