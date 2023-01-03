import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CustomerMaster } from '../customer-model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.sass']
})
export class AddCustomerComponent extends  UnsubscribeOnDestroyAdapter  implements OnInit {

  docForm:FormGroup;
  edit:boolean=false;
  hide3 = true;
  agree3 = false;
  public customerMaster:CustomerMaster;
  requestId: number;
  tokenStorage: any;


  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,private cmnService:CommonService,
    private customerService: CustomerService,
    private commonService: CommonService,
    public route: ActivatedRoute,) 
    {
      super(); 

    this.docForm = this.fb.group({
      cus_id:[""],
      auditorname: [""],
      registercode: [""],
      person:[""],
      email:['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      phone:[""],
      address:[""],
      addresstwo:[""],
      city:[""],
      state:[""],
      postalcode:["",[Validators.required]],
      panno:[""],
      vatno:[""],
      gstno:[""],
      cstno:[""],
      remarks:[""],
      active:[""],
     
   
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

  onsubmit(){
  {
    if(this.docForm.valid){
    this.customerMaster = this.docForm.value;
    console.log(this.customerMaster);
    this.customerService.addCustomer(this.customerMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
     this.router.navigate(['/master/customer/list-customer']);
    }
  }
}  

fetchDetails(cus_id: any): void {
  const obj = {
    editId: cus_id
  }
  this.customerService.editCustomer(obj).subscribe({
    next: (res) => {

    this.docForm.patchValue({
      'cus_id': res.customerBean.cus_id,
      'auditorname': res.customerBean.auditorname,
      'registercode': res.customerBean.registercode,
      'person': res.customerBean.person,
      'email': res.customerBean.email,
      'phone' : res.customerBean.phone,
      'address': res.customerBean.address,
      'addresstwo':res.customerBean.addresstwo,
      'city': res.customerBean.city,
      'state':res.customerBean.state,
      'postalcode':res.customerBean.postalcode,
      'panno':res.customerBean.panno,
      'vatno':res.customerBean.vatno,
      'gstno':res.customerBean.gstno,
      'cstno':res.customerBean.cstno,
      'remarks':res.customerBean.remarks,
      'active':res.customerBean.active
     

   });
  },
  
 });


}

keyPressPCB(event: any) {
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
keyPressPCC(event:any){
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 6 && !pattern.test(inputChar)) {
    event.preventDefault();
  }

}

update(){
  this.customerMaster = this.docForm.value;
  this.customerService.updateCustomer(this.customerMaster);
  this.showNotification(
    "snackbar-success",
    "Edit Record Successfully...!!!",
    "bottom",
    "center"
  );
  this.router.navigate(['/master/customer/list-customer']);

}

reset(){
  if (!this.edit) {
    this.docForm.reset();
    this.docForm.patchValue({
      cus_id:[""],
      auditorname: [""],
      registercode: [""],
      person:[""],
      email:[""],
      phone:[""],
      address:[""],
      addresstwo:[""],
      city:[""],
      state:[""],
      postalcode:[""],
      panno:[""],
      vatno:[""],
      gstno:[""],
      cstno:[""],
      remarks:[""],
      active:[""],
      'loginedUser': this.tokenStorage.getUserId()
    })
  } else {
    this.fetchDetails(this.requestId);
  }
}

onCancel(){

  this.router.navigate(['/master/customer/list-customer']);


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
