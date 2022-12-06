import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { WorkOrder } from '../work-order.model';
import { WorkOrderService } from '../work-order.service';
import { WorkOrderResultBean } from '../work-order-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';
import { AppComponent } from 'src/app/app.component';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {CommonService} from 'src/app/common-service/common.service';


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
  selector: 'app-add-work-order',
  templateUrl: './add-work-order.component.html',
  styleUrls: ['./add-work-order.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },CommonService
  ]
  
})
export class AddWorkOrderComponent implements OnInit {
  public docForm: FormGroup;
  workOrder: WorkOrder;
  hide3 = true;
  agree3 = false;
  workOrderDtlData = [];
  cusMasterData = [];
  salesEntryData = [];
  customerOrderNoList = [];
  uomList = [];
  itemList = [];
  edit:boolean=false;
  requestId:number;
  // workOrderDtlData = {
  //   workOrderNo: '',
  //   itemId: '',
  //   quantity: '',
  //   uomId: '',
  //   deliveryDate: '',
  //   remarks: ''
  // };
  date: string;
  constructor(private fb: FormBuilder, public router: Router,
     private workOrderService: WorkOrderService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private snackBar:MatSnackBar,private serverUrl:serverLocations,
    private cmnService:CommonService) { 
    
      
  }
 
  createWorkOrderDtl():FormGroup{

    return this.fb.group({
      itemId:[""],
      quantity:[""],
      uomId:[""],
      deliveryDate: [""],
      remarks : [""]
    })
  }

  ngOnInit() {

    this.docForm = this.fb.group({
      workorderNo: ["", [Validators.required]],
      workorderDate: ["", [Validators.required]],
      salesOrderNo: ["", [Validators.required]],
      
     // workOrderDtlData:this.fb.array([this.createWorkOrderDtl()])
     workOrderDtlData: this.fb.array([
      this.fb.group({
        itemId:[""],
        quantity:[""],
        uomId:[""],
        deliveryDate: [""],
        remarks : [""]
      })
     ])

    });


    
    //this.dataarray.push(this.workOrderDtlData)
    //this.addRow();
    this.cusMasterData.push(this.docForm);
    this.cusMasterData.push(this.workOrderDtlData);

    this.httpService.get<WorkOrderResultBean>(this.workOrderService.workOrderNoList).subscribe(
      (data) => {
        this.customerOrderNoList = data.workOrderNoList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<WorkOrderResultBean>(this.workOrderService.uomList).subscribe(
      (data) => {
        console.log(data);
        this.uomList = data.uomList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<WorkOrderResultBean>(this.workOrderService.itemListUrl).subscribe(
      (data) => {
        console.log(data);
        this.itemList = data.itemList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
      else{
        this.getWorkOrderNumber();
      }
     });
    
  }

  onSubmit() {
  //  let dateValue =moment(this.docForm.value.workorderDate).forma 
    this.workOrder = this.docForm.value;

    this.workOrderService.addWorkOrder(this.workOrder);
    this.showNotification(
      "snackbar-success",
      "Record Added!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/operations/workOrder/listWorkOrder']);
  }

  fetchDetails(workorderNo: any): void {
    this.httpService.get(this.workOrderService.editWorkOrderHdr+"?workOrder="+workorderNo).subscribe((res: any)=> {
      console.log(workorderNo);

      this.docForm.patchValue({
        'workorderNo': res.workOrderHdrObjBean.workorderNo,
        'workorderDate': res.workOrderHdrObjBean.workorderDate,
        'salesOrderNo': res.workOrderHdrObjBean.salesOrderNo,
    });
    let workOrderDtlArray = this.docForm.controls.workOrderDtlData as FormArray;
    workOrderDtlArray.removeAt(0);
    res.workOrderDtlBean.forEach(element => {
        let workOrderDtlArray = this.docForm.controls.workOrderDtlData as FormArray;
        let arraylen = workOrderDtlArray.length;
        let newUsergroup: FormGroup = this.fb.group({
        itemId:[element.itemId],
        quantity:[element.quantity],
        uomId:[element.uomId],
        deliveryDate: [element.deliveryDate],
        remarks : [element.remarks]
      })
      workOrderDtlArray.insert(arraylen,newUsergroup);
        
      });
     //this.workOrderDtlData = res.workOrderDtlBean;
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){

    this.workOrder = this.docForm.value;
   // this.workOrder.workOrderDtlObjBean = this.dataarray;
    this.workOrderService.workOrderUpdate(this.workOrder);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/operations/workOrder/listWorkOrder']);

  }

  addRow(){
    
    let workOrderDtlArray = this.docForm.controls.workOrderDtlData as FormArray;
    let arraylen = workOrderDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      itemId:[""],
      quantity:[""],
      uomId:[""],
      deliveryDate: [""],
      remarks : [""]
    })
    workOrderDtlArray.insert(arraylen,newUsergroup);
  }
  removeRow(index){
    
    let workOrderDtlArray = this.docForm.controls.workOrderDtlData as FormArray;
    workOrderDtlArray.removeAt(index);
  }

 onCancel(){
     this.router.navigate(['/operations/workOrder/listWorkOrder']);
}

getDate(event){
  return this.cmnService.getDate(event.target.value);  
}
  reset(){
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getWorkOrderNumber(){
        this.httpService.get<WorkOrderResultBean>(this.workOrderService.workOrderNumber).subscribe(
          (data) => {
            if(data){
            this.docForm.patchValue({
                    'workorderNo': data.workOrderNumber
                });

            }
          },
          (error: HttpErrorResponse) => {
          }
        );
  }

  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.date = moment(event.value);
    
  // }

  keyPressPCB(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
