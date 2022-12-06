import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-gate-pass',
  templateUrl: './add-gate-pass.component.html',
  styleUrls: ['./add-gate-pass.component.sass']
})
export class AddGatePassComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  dataarray1=[];
  cusMasterData =[];
  salesEntryData=[];
  salesDetailRowData = new SalesEntryDetailRowComponent;
  constructor(private fb: FormBuilder,public router: Router,private authService: AuthService) { 
    this.docForm = this.fb.group({
      organizationName: ["", [Validators.required]],
      manualGatePassNumber: ["", [Validators.required]],
      location: ["", [Validators.required]],
      gatePassDate: ["", [Validators.required]],
      address: ["",[Validators.required]],
      deliveryOrderNo: ["",[Validators.required]],
      party: ["",[Validators.required]],
      invoiceNo: ["",[Validators.required]],
      modeOfDelivery:["",[Validators.required]],
      vendor:["",[Validators.required]],
      personName:["",[Validators.required]],
      purchaseOrder: ["",[Validators.required]],
      reasonRemarks: ["",[Validators.required]],
    });
  }

  ngOnInit(): void {
    this.dataarray1.push(this.salesDetailRowData)
    this.cusMasterData.push(this.docForm)
    this.salesEntryData.push(this.dataarray1)
  }
  onSubmit() {
    console.log("Form Value", this.docForm.value);
    console.log(this.dataarray)
    console.log(this.cusMasterData)
    console.log(this.salesEntryData)
  }
  
  addRow1(){
    this.salesDetailRowData=new SalesEntryDetailRowComponent()
    this.dataarray1.push(this.salesDetailRowData)

  }
  removeRow1(index){
    this.dataarray1.splice(index, 1);
  }

  onCancel(){
    this.router.navigate(['/inventory/gatePass/listGatePass']);
   }

   reset(){}

}
