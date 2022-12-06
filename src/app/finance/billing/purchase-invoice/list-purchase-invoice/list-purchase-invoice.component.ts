import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-purchase-invoice',
  templateUrl: './list-purchase-invoice.component.html',
  styleUrls: ['./list-purchase-invoice.component.sass']
})
export class ListPurchaseInvoiceComponent implements OnInit {
  displayedColumns = [
    "select",
    "img",
    "name",
    "department",
    "role",
    "degree",
    "mobile",
    "email",
    "date",
    "actions",
  ];
  constructor() { }

  ngOnInit(): void {
  }
  removeSelectedRows(){

  }
  refresh(){}
  deleteItem(){}
  editCall(){}
  addNew(){}

}
