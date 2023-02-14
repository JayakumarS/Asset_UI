import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { SalesOrderService } from '../sales-order.service'; 
import { SalesOrder } from '../sales-order-model';

@Component({
  selector: 'app-add-sales-order',
  templateUrl: './add-sales-order.component.html',
  styleUrls: ['./add-sales-order.component.sass']
})
export class AddSalesOrderComponent implements OnInit {
  docForm: FormGroup;
  salesOrder:SalesOrder;
  edit: any;
  requestId: any;

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private commonService: CommonService,
    private cmnService:CommonService,private httpService: HttpServiceService,private salesOrderService: SalesOrderService,
    private router:Router,public route: ActivatedRoute)
     {    this.docForm = this.fb.group({
      customer:[""],
      currency:[""],
      dateofdelivery:[""],
      termsandcondition:[""],

      salesOrderDtlBean: this.fb.array([
        this.fb.group({
          product:[""],
          uom:[""],
          rate:[""],
          qty:[""],
          price:[""],
          total:[""],

        }) 
      ]) 
      

    })
  }
  
  getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='startdate'){
      this.docForm.patchValue({startdate:cdate});
    }
    else if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:cdate});
    }
    // else if(inputFlag=='expectedDate'){
    //   this.docForm.patchValue({expectedDate:cdate});
    // }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    if(params.id!=undefined && params.id!=0){
     this.requestId = params.id;
     this.edit=true;
    this.fetchDetails(this.requestId) ;

    }
   });

  
 
  }

  fetchDetails(id:any){
    
  }

  
  removeRowSelf(index){
    let dtlArray = this.docForm.controls.salesOrderDtlBean as FormArray;
    // if(index != 0){
    dtlArray.removeAt(index);
    // }
  
  }

  addRowSelf(){
    let dtlArray = this.docForm.controls.salesOrderDtlBean as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      product:[""],
      uom:[""],
      rate:[""],
      qty:[""],
      price:[""],
      total:[""],
    })
    dtlArray.insert(arraylen,newUsergroup);
  
  }

  onSubmit(){

    if(this.docForm.valid){
    this.salesOrder = this.docForm.value;
    console.log(this.salesOrder);
    this.salesOrderService.save(this.salesOrder);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/inventory/sales-order/list-sales-order']);
    
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please fill the required details",
      "top",
      "right"
    );
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

}
