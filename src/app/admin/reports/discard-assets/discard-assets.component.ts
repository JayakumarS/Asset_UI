import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-discard-assets',
  templateUrl: './discard-assets.component.html',
  styleUrls: ['./discard-assets.component.sass']
})
export class DiscardAssetsComponent implements OnInit {
  docForm: FormGroup;

  constructor(private fb: FormBuilder,) { 
    this.docForm = this.fb.group({
     
      item: [""],
      fromDateObj: [""],
      toDateObj:[""],
      fromDate: [""],
      toDate: [""],
      itemWise: [""],
      availableQty: [""],
      orderQty: [""],
      workInQty: [""],
      location: [""]
    });
  }

  ngOnInit(): void {
  }

}
