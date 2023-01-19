import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DepreciationMaster } from '../depreciation-model';
import { DepreciationService } from '../depreciation.service';

@Component({
  selector: 'app-add-depreciation',
  templateUrl: './add-depreciation.component.html',
  styleUrls: ['./add-depreciation.component.sass']
})
export class AddDepreciationComponent implements OnInit {
  docForm: FormGroup;
  depreciationMaster : DepreciationMaster;
  edit: any;
  requestId: any;
  totalValue1: any;
  //depreciationService: DepreciationService;
  constructor(private fb: FormBuilder,private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    public route: ActivatedRoute,private depreciationService: DepreciationService,
    private router:Router) { 

    this.docForm = this.fb.group({
      name: ["", [Validators.required]],
      code: [""],
      active:[false],
      id:[""],

      manageLineDtlObjBean: this.fb.array([
        this.fb.group({
          percentage:[""],
          remarks:[""],
         }) 
      ])
      
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
    }


  removeRowSelf(index){
    let dtlArray = this.docForm.controls.manageLineDtlObjBean as FormArray;
    if(index != 0){
    dtlArray.removeAt(index);
    }
  
  }

  addRowSelf(){
    let dtlArray = this.docForm.controls.manageLineDtlObjBean as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      percentage:[""],
      remarks:[""],
    })
    dtlArray.insert(arraylen,newUsergroup);
  
  }
  
  onSubmit(){

    if(this.docForm.valid){
    this.depreciationMaster = this.docForm.value;

    let dtlBean = this.docForm.controls.manageLineDtlObjBean as FormArray;      // this.value1=purchaseInvoiceDetailArray.value[index].detailQuantity * purchaseInvoiceDetailArray.value[index].detailUnitPrice;
 
    var i=0;
    var length= dtlBean.controls.length;
    this.totalValue1=0;
    for(i=0;i<length;i++){

    this.totalValue1=+this.totalValue1 + +dtlBean.value[i].percentage;

    }

    if(this.totalValue1 > 101){
      this.showNotification(
        "snackbar-danger",
        "Percentage Value Should Not Exceed 100% .. !!!",
        "bottom",
        "center"
      );
    }else{      
    console.log(this.depreciationMaster);
    this.depreciationService.save(this.depreciationMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/depreciation/list-depreciation']);
    }
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
 

//  reset(){
//   if (!this.edit) {
//   this.docForm = this.fb.group({
//     name: [""],
//     code: [""],
//     active: [""],

//   });
// } else {
//   //this.fetchDetails(this.requestId);
// }
// }

reset() {
  if (!this.edit) {
    this.docForm.reset();
    this.docForm.patchValue({
      name: [""],
      code: [""],
      active: [""],
     
    })
  } else {
    this.fetchDetails(this.requestId);
  }
}

cancel(){
  this.router.navigate(['/master/depreciation/list-depreciation']);

}


fetchDetails(depreciation: any): void {
  this.requestId = depreciation;
  this.httpService.get(this.depreciationService.editDepreciation + "?depreciation=" + depreciation).subscribe((res: any) => {

    console.log(depreciation);

    this.docForm.patchValue({
     
      'name': res.depreciationBean.name,
      'code': res.depreciationBean.code,
      'active' : res.depreciationBean.active, 
      // 'percentage' : res.depreciationList[0].manageLineDtlObjBean[0].percentage,
      // 'remarks' : res.depreciationList[0].manageLineDtlObjBean[0].remarks

   })


   
   let manageAuditDtlArray = this.docForm.controls.manageLineDtlObjBean as FormArray;
   manageAuditDtlArray.removeAt(0);
   if(res.depreciationBean.manageLineDtlObjBean!=null){

   
    res.depreciationBean.manageLineDtlObjBean.forEach(element => {
          let manageAuditDtlArray = this.docForm.controls.manageLineDtlObjBean as FormArray;
          let arraylen = manageAuditDtlArray.length;
          let newUsergroup: FormGroup = this.fb.group({
            percentage:[element.percentage],
            remarks:[element.remarks]
            
        })
        manageAuditDtlArray.insert(arraylen,newUsergroup);
      });
    }
    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
 
}

update(){

  this.depreciationMaster = this.docForm.value;
  let dtlBean = this.docForm.controls.manageLineDtlObjBean as FormArray;      // this.value1=purchaseInvoiceDetailArray.value[index].detailQuantity * purchaseInvoiceDetailArray.value[index].detailUnitPrice;
 
  var i=0;
  var length= dtlBean.controls.length;
  this.totalValue1=0;
  for(i=0;i<length;i++){

  this.totalValue1=+this.totalValue1 + +dtlBean.value[i].percentage;

  }

  if(this.totalValue1 <= 100){
  this.depreciationMaster.id = this.requestId;
  this.httpService.post(this.depreciationService.updateDepreciation, this.depreciationMaster).subscribe((res: any) =>{
   
   if(res.success){
    this.showNotification(
      "snackbar-success",
      "Record Successfully Added...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/depreciation/list-depreciation']);
   }else{
    this.showNotification(
      "snackbar-danger",
      "Department Code Already Exists...!!!",
      "bottom",
      "center"
    );
   }
   
   
  });
}else{
  this.showNotification(
    "snackbar-danger",
    "Percentage Value Should Not Exceed 100% .. !!!",
    "bottom",
    "center"
  );
}
  
}

keyPressNumberDouble(event: any) {
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
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
