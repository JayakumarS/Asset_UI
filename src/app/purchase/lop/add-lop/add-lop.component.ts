import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { DetailRowComponent } from 'src/app/purchase/purchase-request/detail-row/detail-row.component';
import { Lop } from '../lop.model';
import { LopService } from '../lop.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-lop',
  templateUrl: './add-lop.component.html',
  styleUrls: ['./add-lop.component.sass']
})
export class AddLopComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  dataarray1=[];
  cusMasterData =[];
  salesEntryData=[];
  purchaseRequestDetail= new DetailRowComponent;
  lop: Lop

  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,
    private lopService: LopService,private httpService: HttpServiceService) { 
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
      purchase: [""],
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
    this.lop = this.docForm.value;
    console.log(this.lop);
    this.lopService.addLop(this.lop);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/purchase/lop/listLpo']);
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
    this.router.navigate(['/purchase/lop/listLpo']);
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