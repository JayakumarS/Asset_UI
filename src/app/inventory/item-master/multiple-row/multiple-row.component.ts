import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-row',
  templateUrl: './multiple-row.component.html',
  styleUrls: ['./multiple-row.component.sass']
})
export class MultipleRowComponent implements OnInit {
  tableId : any;
  vendor: any;
  vendorItemName: any;
  vendorItemCode : any;
  minimunQty: any;
  vendorUom: any;
  leadTime: any;
  pricingTime: any;

  constructor() { }

  ngOnInit(): void {
  }

}
