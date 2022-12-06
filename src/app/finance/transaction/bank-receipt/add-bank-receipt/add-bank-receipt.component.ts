import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesEntryDetailRowComponent } from 'src/app/crm/sales-call-entry/sales-entry-detail-row/sales-entry-detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bank-receipt',
  templateUrl: './add-bank-receipt.component.html',
  styleUrls: ['./add-bank-receipt.component.sass']
})
export class AddBankReceiptComponent implements OnInit {
  docForm: FormGroup;
  // hide3 = true;
  // agree3 = false;
  dataarray=[];
  dataarray1=[];
  cusMasterData =[];
  salesEntryData=[];
  salesDetailRowData = new SalesEntryDetailRowComponent;
  constructor(private fb: FormBuilder,public router: Router,private authService: AuthService) { 
    this.docForm = this.fb.group({
      receiptDate: ["", [Validators.required]],
      currency: ["",[Validators.required]],
      chequeNo: ["", [Validators.required]],
      companyName: ["", [Validators.required]],
      exchangeDate: ["", [Validators.required]],
      chequeDate: [""],
      typeOfPayment: [""],
      receivedFrom: [""],      
      narration: ["",],
      bankAccount: [""],
      amount: [""],
      totalBcAmt: [""],
      totalTcAmt: [""],

      
    });
  }

  ngOnInit(): void {
    this.dataarray.push(this.salesDetailRowData)
    this.dataarray1.push(this.salesDetailRowData)
    this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.dataarray)
  }
  onSubmit() {
    console.log("Form Value", this.docForm.value);
    console.log(this.dataarray)
    console.log(this.cusMasterData)
    console.log(this.salesEntryData)
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
  removeRow1(index){
    this.dataarray1.splice(index, 1);
  }

 onCancel(){
     this.router.navigate(['/finance/transaction/bankReceipt/listBankReceipt']);
}
  reset(){
    
  }

}
