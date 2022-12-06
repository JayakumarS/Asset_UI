import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-row',
  templateUrl: './detail-row.component.html',
  styleUrls: ['./detail-row.component.sass']
})
export class DetailRowComponent implements OnInit {

  itemCode: any;
  itemCategory: any;
  uom: any;
  itemDescription : any;
  availQuantity : any;
  quantity : any;
  alternateUom : any;
  alternateQuantity :any;
  edd : any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
