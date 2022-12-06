import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  constructor(private fb: FormBuilder,public router: Router) {
    this.docForm = this.fb.group({
      customerCategoryCode: ["", [Validators.required]],
      customerTypeDesc: ["",[Validators.required]],
      customerTypeNo: ["", [Validators.required]],
    });
   }

   onSubmit() {
    console.log("Form Value", this.docForm.value);
  }
  onCancel(){
    this.router.navigate(['/master/location/listLocation']);
}
 reset(){
   
 }
 

}
