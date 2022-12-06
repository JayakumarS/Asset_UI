import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailRowComponent } from '../detail-row/detail-row.component';
import { PurchaseRequest } from '../purchase-request.model';
import { PurchaseRequestService } from '../purchase-request.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.sass']
})
export class AddPurchaseComponent implements OnInit {
docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  requestId: number;
  edit:boolean=false;
  dataarray=[];
  dataarray1=[];
  cusMasterData =[];
  salesEntryData=[];
  purchaseRequestDetail= new DetailRowComponent;
  purchaseRequest: PurchaseRequest;
  purchaseCategory: any;

  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,
    private purchaseRequestService: PurchaseRequestService,public route: ActivatedRoute,private httpService: HttpServiceService) { 
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      company: ["", [Validators.required]],
      requestType: ["", [Validators.required]],
      requestDate: ["", [Validators.required]],
      sourceLocation: ["", [Validators.required]],
      destinationLocation: ["",[Validators.required]],
      costCenter: [""],
      requestedBy: [""],
      jobTitle: [""],
      prReqNo:[""],
      requisitionId:[""]
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

    this.dataarray.push(this.purchaseRequestDetail)
    this.dataarray1.push(this.purchaseRequestDetail)
    this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.dataarray)
    this.salesEntryData.push(this.dataarray1)
  }

   // Edit
   fetchDetails(requestType: any): void {
    this.httpService.get(this.purchaseRequestService.editPurchase+"?purchaseRequest="+requestType).subscribe((res: any)=> {
      console.log(requestType);

      this.docForm.patchValue({
        'prReqNo': res.purchaseRequestBean.prReqNo,
        'requisitionNo': res.purchaseRequestBean.requisitionNo,
        'requestType': res.purchaseRequestBean.requestType,
        'requestedBy': res.purchaseRequestBean.requestedBy,
        'jobTitle': res.purchaseRequestBean.jobTitle,
        'sourceLocation': res.purchaseRequestBean.sourceLocation,
        'destinationLocation': res.purchaseRequestBean.destinationLocation,
        'company': res.purchaseRequestBean.company,
        'requestDate': res.purchaseRequestBean.requestDate,
        'costCenter': res.purchaseRequestBean.costCenter,
        'requisitionId': res.purchaseRequestBean.requisitionId,
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
    this.purchaseRequest = this.docForm.value;
    console.log(this.purchaseRequest);
    this.purchaseRequestService.addPurchase(this.purchaseRequest);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/purchase/purchaseRequest/listPurchase']);
  }

  update(){

    this.purchaseRequest = this.docForm.value;
    this.purchaseRequestService.UpdatePurchase(this.purchaseRequest);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/purchase/purchaseRequest/listPurchase']);

  }

  addRow(){
    this.purchaseRequestDetail=new DetailRowComponent()
    this.dataarray.push(this.purchaseRequestDetail)

  }
  removeRow(index){
    this.dataarray.splice(index, 1);
  }

  addRow1(){
    this.purchaseRequestDetail=new DetailRowComponent()
    this.dataarray1.push(this.purchaseRequestDetail)

  }
  removeRow1(index){
    this.dataarray1.splice(index, 1);
  }

  onCancel(){
    this.router.navigate(['/purchase/purchaseRequest/listPurchase']);
   }
   reset(){}

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


}