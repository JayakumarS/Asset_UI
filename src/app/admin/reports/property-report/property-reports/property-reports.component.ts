import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-report',
  templateUrl: './property-report.component.html',
  styleUrls: ['./property-report.component.sass']
})
export class PropertyReportsComponent implements OnInit {

  docForm: FormGroup;

  constructor(private fb: FormBuilder,) { 
    this.docForm = this.fb.group({
      name:[""],
      loanRef:[""],
      type:[""],
      currencyl:[""],
      bankname:[""],
      ifsccode:[""],

       // Checkboxes Beans
       nameCheckbox:[false],
       mailCheckBox:[false],
       loanRefCheckBox:[false],



    });
  }

  ngOnInit(): void {
  }
  onSubmit(){

  }
  

  reset() {

  }

}
