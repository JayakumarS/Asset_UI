import { Component,OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Router , ActivatedRoute } from '@angular/router';
import { BillOfOperation } from "../boo.model";
import { BooService } from "../boo.service";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BillOfOperationResultBean } from "../boo-result-bean";
import { WorkOrderService } from "../../work-order/work-order.service";


@Component({
  selector: 'app-add-boo',
  templateUrl: './add-boo.component.html',
  styleUrls: ['./add-boo.component.sass']
})
export class AddBooComponent {
  docForm: FormGroup;
  billOfOperation: BillOfOperation;
  requestId: number;
  edit:boolean=false;
  dataarray=[];
  itemList=[];
  listOfItem = [];
  cusMasterData =[];
  salesEntryData=[];
  booDetailBean = {
    processSeqNo: '',
    processName: '',
    approxTime: '',
    processRemarks: ''
  }

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private snackBar: MatSnackBar,
    private workOrderService: WorkOrderService,
    public booService: BooService,
    public route: ActivatedRoute,
    private httpService: HttpServiceService) {
    this.docForm = this.fb.group({
      booNo: ["", [Validators.required]],
      bomRef: ["", [Validators.required]],
      productName: ["", [Validators.required]],
      date: ["",[Validators.required]],
      idNo: [""],
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
    else{
      this.getBillOfOperationNumber();
    }
     });
    this.dataarray.push(this.booDetailBean)
    this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.dataarray)

    this.httpService.get<BillOfOperationResultBean>(this.booService.billOfOperationList).subscribe(
      (data) => {
        this.listOfItem = data.billOfOperationList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<BillOfOperationResultBean>(this.workOrderService.itemListUrl).subscribe(
      (data) => {
        console.log(data);
        this.itemList = data.itemList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }

  onSubmit() {
    this.billOfOperation = this.docForm.value;
    this.billOfOperation.booDetailBean = this.dataarray;
    console.log(this.billOfOperation);
    console.log(this.dataarray);
    this.booService.addBillOfOperation(this.billOfOperation);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center");
      this.router.navigate(['/operations/billOfOperation/listBoo']);
    // console.log("Form Value", this.docForm.value);
    // console.log(this.dataarray)
    // console.log(this.cusMasterData)
    // console.log(this.salesEntryData)
  
  }

  fetchDetails(idNo: any): void {
    this.httpService.get(this.booService.editBillOfOperation+"?billOfOperation="+idNo).subscribe((res: any)=> {
      console.log(idNo);

      this.docForm.patchValue({
        'booNo': res.billOfOperationBean.booNo,
        'bomRef': res.billOfOperationBean.bomRef,
        'productName': res.billOfOperationBean.productName,
        'date': res.billOfOperationBean.date,
        'idNo': res.billOfOperationBean.idNo,
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  update(){

    this.billOfOperation = this.docForm.value;
    this.booService.billOfOperationUpdate(this.billOfOperation);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/operations/billOfOperation/listBoo']);

  }

  addRow(){
    this.booDetailBean=this.booDetailBean;
    this.dataarray.push(this.booDetailBean)

  }
  onCancel(){
    this.router.navigate(['/operations/billOfOperation/listBoo']);
  }
  removeRow(index){
    this.dataarray.splice(index, 1);
  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getBillOfOperationNumber(){
    this.httpService.get<BillOfOperationResultBean>(this.booService.billOfOperationNumber).subscribe(
      (data) => {
        if(data){
        this.docForm.patchValue({
                'booNo': data.booNumber
            });

        }
      },
      (error: HttpErrorResponse) => {
      }
    );
}

}

