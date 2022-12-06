import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
@Component({
  selector: "app-tabs",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.sass"],
})
export class AddEmployeeComponent {

  // tabs = ["Asset Information", "Purchase Information", "Financial Information","Alloted Information"];
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  constructor(private fb: FormBuilder) {
    this.docForm = this.fb.group({
      assetName: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      assetCode: ["",[Validators.required]],
      location: ["", [Validators.required]],
      status: ["", [Validators.required]],
      category: ["", [Validators.required]],
      uploadImg: [""],
      brand: [""],
      model:[""],
      serialNo:[""],
      assetStatus:[""],
      assetDepartment: [""],
      vendor: [""],
      poNumber: [""],
      invoiceDate: [""],
      invoiceNo: [""],
      purchasePrice: [""],
      conformPassword: ["", [Validators.required]],
      designation: [""],
      department: [""],
      address: [""],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ["", [Validators.required]],
      education: [""],
      
    });
  }
  onSubmit() {
    console.log("Form Value", this.docForm.value);
  }

  // selected = new FormControl(0);
  // addTab(selectAfterAdding: boolean) {
  //   this.tabs.push("New");
  //   if (selectAfterAdding) {
  //     this.selected.setValue(this.tabs.length - 1);
  //   }
  // }
  // removeTab(index: number) {
  //   this.tabs.splice(index, 1);
  // }
}
