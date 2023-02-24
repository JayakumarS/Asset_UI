import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { SalesOrderService } from '../sales-order.service'; 
import { SalesOrder } from '../sales-order-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SalesInvoiceService } from '../../sales-invoice/sales-invoice.service';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-add-sales-order',
  templateUrl: './add-sales-order.component.html',
  styleUrls: ['./add-sales-order.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
        },
      }
    }, CommonService
  ]
})
export class AddSalesOrderComponent implements OnInit {
  docForm: FormGroup;
  salesOrder:SalesOrder;
  edit: any;
  requestId: any;
  currencyList: [];
  submitted: boolean;
  customerDropDown: [];
  user: string;
  customer: any;
  itemDropDown: [];
  uomDropDown: [];
  value: any;
  value1: any;
  currencyListbasedCompany=[];

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar,private commonService: CommonService,
    private salesInvoiceService: SalesInvoiceService,
    private cmnService:CommonService,private httpService: HttpServiceService,private salesOrderService: SalesOrderService,
    private router:Router,public route: ActivatedRoute,    private spinner: NgxSpinnerService,public tokenStorage: TokenStorageService,
    )
     {    this.docForm = this.fb.group({
      customer:[""],
      currency:[""],
      dateofdelivery:[""],
      termsandcondition:[""],
      companyId:[""],
      salesOrderNo:[""],

      salesOrderDtl: this.fb.array([
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

   //Currency  Dropdown List
   this.httpService.get<any>(this.commonService.getCurrencyDropdown).subscribe({
    next: (data) => {
      this.currencyList = data;
    },
    error: (error) => {
    }
  });
  this.user = this.tokenStorage.getCompanyId();


    this.httpService.get<any>(this.commonService.getCustomerDropdown + "?userId=" + (this.user)).subscribe({
    next: (data) => {
      this.customerDropDown = data.addressBean;
    },
    error: (error) => {
    }
  });

  ///////////////company based Currency List
  this.httpService.get<any>(this.salesOrderService.getCompanyBasedCurrency + "?userId=" + (this.user)).subscribe({
    next: (data) => {
      this.currencyListbasedCompany = data.salesOrderBean;
    },
    error: (error) => {
    }
  });


  this.httpService.get<any>(this.salesInvoiceService.itemDropdown + "?companyId=" + (this.user)).subscribe({
    next: (data) => {
      this.itemDropDown = data.addressBean;
    },
    error: (error) => {
    }
  });

    this.httpService.get<any>(this.salesInvoiceService.getUomListDropdown + "?companyId=" + (this.user)).subscribe({
    next: (data) => {
      this.uomDropDown = data.addressBean;
    },
    error: (error) => {
    }
  });
  
 
  }

  fetchDetails(salesOrderNo:any){
    const obj = {
      editId: salesOrderNo
    };
    this.salesOrderService.editSalesOrder(obj).subscribe({
      next: (res) => {
       this.customer= res.salesOrderBean.customer;
      this.docForm.patchValue({
        'salesOrderNo': res.salesOrderBean.salesOrderNo,
          'customer':parseInt( res.salesOrderBean.customer),
          'currency': parseInt( res.salesOrderBean.currency),
          'dateofdelivery' : res.salesOrderBean.dateofdelivery,
          'termsandcondition' : res.salesOrderBean.termsandcondition,
            
      });
      if (res.salesOrderDetail != null && res.salesOrderDetail.length >= 1) {
        let salesOrderDetailArray = this.docForm.controls.salesOrderDtl as FormArray;
        salesOrderDetailArray.clear();
        res.salesOrderDetail.forEach(element => {
          let salesOrderDetailArray = this.docForm.controls.salesOrderDtl as FormArray;
          let arraylen = salesOrderDetailArray.length;
          let newUsergroup: FormGroup = this.fb.group({
            product: [parseInt( element.product)],
            uom: [parseInt( element.uom)],
            rate: [ element.rate],
            total: [ element.total],
            qty: [ element.qty],
            price: [element.price],
          })
          salesOrderDetailArray.insert(arraylen, newUsergroup);
        });
      }
    },
    error: (error) => {
    }
  });
    
  }

  
update() {
  this.salesOrder = this.docForm.value;
  this.spinner.show();
  this.salesOrderService.update(this.salesOrder).subscribe({
    next: (data) => {
      this.spinner.hide();
      if (data.success) {
        this.showNotification(
          "snackbar-success",
          "Edit Record Successfully",
          "bottom",
          "center"
        );
        this.cancel();
      } else {
        this.showNotification(
          "snackbar-danger",
          "Not Updated Successfully...!!!",
          "bottom",
          "center"
        );
      }
    },
    error: (error) => {
      this.spinner.hide();
      this.showNotification(
        "snackbar-danger",
        error.message + "...!!!",
        "bottom",
        "center"
      );
    }
  });
}

  reset() {
    if (!this.edit) {
    this.docForm = this.fb.group({
      customer:[""],
      currency:[""],
      dateofdelivery:[""],
      termsandcondition:[""],
      salesOrderDtl: this.fb.array([
        this.fb.group({
          product:[""],
          uom:[""],
          rate:[""],
          qty:[""],
          price:[""],
          total:[""],

        }) 
      ]) 
    });
  } else {
    this.fetchDetails(this.requestId);
  }
  }

  
  removeRowSelf(index){
    let dtlArray = this.docForm.controls.salesOrderDtl as FormArray;
    // if(index != 0){
    dtlArray.removeAt(index);
    // }
  
  }

  addRowSelf(){
    let dtlArray = this.docForm.controls.salesOrderDtl as FormArray;
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

//   onSubmit(){

//     if(this.docForm.valid){
//     this.salesOrder = this.docForm.value;
//     console.log(this.salesOrder);
//     this.salesOrderService.save(this.salesOrder);
//     this.showNotification(
//       "snackbar-success",
//       "Add Record Successfully...!!!",
//       "bottom",
//       "center"
//     );
//     // this.router.navigate(['/inventory/sales-order/list-sales-order']);
    
//   }
//   else{
//     this.showNotification(
//       "snackbar-danger",
//       "Please fill the required details",
//       "top",
//       "right"
//     );
//   }
  
// }
onSubmit() {
  this.submitted = true;
  if (this.docForm.valid){
    this.salesOrder = this.docForm.value;
    this.spinner.show();
    this.salesOrderService.save(this.salesOrder).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          this.cancel();
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Added...!!!",
            "bottom",
            "center"
          );
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.showNotification(
          "snackbar-danger",
          error.message + "...!!!",
          "bottom",
          "center"
        );
      }
    });
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please Fill The All Required fields",
      "bottom",
      "center"
    );
  }
}

// reset() {
//   location.reload()

//   if (!this.edit) {
//     this.docForm.reset();
//     this.docForm.patchValue({
//       customer:[""],
//       currency:[""],
//       dateofdelivery:[""],
//       termsandcondition:[""],
     
//     })
//   } else {
//     this.fetchDetails(this.requestId);
//   }
// }

cancel(){
  this.router.navigate(['/inventory/sales-order/list-sales-order']);

}

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
Amountcalculation(index:any){
  let fetchAccHeadArray = this.docForm.controls.salesOrderDtl as FormArray;
  this.value=fetchAccHeadArray.value[index].qty * Number(fetchAccHeadArray.value[index].rate);
  fetchAccHeadArray.value[index].price=this.value;
  fetchAccHeadArray.at(index).patchValue({
    price:this.checkIsNaN(parseFloat(this.value)),
  });
}

Qtycalculation(index:any){
  let fetchAccHeadArray = this.docForm.controls.salesOrderDtl as FormArray;
  this.value1=fetchAccHeadArray.value[index].rate * Number(fetchAccHeadArray.value[index].qty);
  fetchAccHeadArray.value[index].price=this.value1;
  fetchAccHeadArray.at(index).patchValue({
    price:this.checkIsNaN(parseFloat(this.value1)),
  });
}

checkIsNaN = function(value){
  if(isNaN(value))
      value = 0
      
  return value;
}


keyPressNumeric1(event: any) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
}
