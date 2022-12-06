import { Component, OnInit } from '@angular/core';
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SalesOrder } from '../sales-order.model';
import { SalesOrderResultBean } from '../sales-order-result-bean';
import { SalesOrderService } from '../sales-order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.sass']
})
export class AddOrderComponent implements OnInit {
  docForm: FormGroup;
  salesOrder:SalesOrder;
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

  constructor(private fb: FormBuilder,private authService: AuthService,public router:Router,
    private salesOrderService : SalesOrderService,public route: ActivatedRoute,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      customer: ["", [Validators.required]],
      text: ["", [Validators.required]],
      
      // salesPerson: ["", [Validators.required]],
      // emailId: [
      //        "",
      //        [VatypeOfCall: ["", [Validators.required]],lidators.required, Validators.email, Validators.minLength(5)],
      //      ],
      // personMet: [""],
      // assignTo: [""],
      validFrom: [""],
      currency:[""],
      
      deliveryDate:[""],
      validTo:[""],
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
    this.httpService.get(this.salesOrderService.editSalesOrder+"?salesOrder="+countValue).subscribe((res: any)=> {
      console.log(countValue);

      this.docForm.patchValue({
        'customer': res.salesOrderBean.customer,
        'validFrom': res.salesOrderBean.validFrom,
        'validTo': res.salesOrderBean.validTo,
        'text': res.salesOrderBean.text,
        'currency': res.salesOrderBean.currency,
        'deliveryDate': res.salesOrderBean.deliveryDate,
        'countValue': res.salesOrderBean.countValue,
        
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
    this.salesOrder = this.docForm.value;
    console.log(this.salesOrder);
    this.salesOrderService.addSalesOrder(this.salesOrder);
    // logger msg
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/marketing/salesOrder/listSalesOrder']);
  }

  update(){
    this.docForm.patchValue({
      'countValue': this.requestId,    
   })
    
    this.salesOrder = this.docForm.value;
    this.salesOrderService.UpdateSalesOrder(this.salesOrder);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/marketing/salesOrder/listSalesOrder']);

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
    this.router.navigate(['/marketing/salesOrder/listSalesOrder']);
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


