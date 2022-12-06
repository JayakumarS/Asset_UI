import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { DetailRowComponent } from 'src/app/purchase/purchase-request/detail-row/detail-row.component';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.sass']
})
export class FormPageComponent  {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  dataarray1=[];
  cusMasterData =[];
  salesEntryData=[];
  purchaseRequestDetail= new DetailRowComponent;

  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {
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
      purchaseRequestNo:[""],
      requestdate:[""],
    });
  }
  ngOnInit(): void {
    this.dataarray.push(this.purchaseRequestDetail)
    this.dataarray1.push(this.purchaseRequestDetail)
    this.cusMasterData.push(this.docForm)
    this.cusMasterData.push(this.dataarray)
    this.salesEntryData.push(this.dataarray1)
  }
  onSubmit() {
    console.log("Form Value", this.docForm.value);
    console.log(this.dataarray)
    console.log(this.cusMasterData)
    console.log(this.salesEntryData)
    // this.authService.salesCallEntry( this.docForm.value).subscribe((result: any) => {
    // }, error => {
    //           console.log(error);
    //   });
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
    this.router.navigate(['/purchase/lop/addLop']);
   }
  }