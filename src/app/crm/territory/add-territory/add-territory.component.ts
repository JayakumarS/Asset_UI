import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-territory',
  templateUrl: './add-territory.component.html',
  styleUrls: ['./add-territory.component.sass']
})
export class AddTerritoryComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  constructor(private fb: FormBuilder,public router: Router) {
    this.docForm = this.fb.group({
      territoryCode: ["", [Validators.required]],
      region: ["", Validators.required],
      country: ["", [Validators.required]],
      pasterritorySalesHeadsword: ["", [Validators.required]],
      territorySalesPerson: ["", [Validators.required]],
      description: ["",Validators.required],
    });
   }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("Form Value", this.docForm.value);
  }
  onCancel(){
     this.router.navigate(['/crm/territory/listTerritory']);
}
  reset(){
    
  }


}
