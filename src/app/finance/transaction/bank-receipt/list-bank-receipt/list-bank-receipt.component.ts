import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-bank-receipt',
  templateUrl: './list-bank-receipt.component.html',
  styleUrls: ['./list-bank-receipt.component.sass']
})
export class ListBankReceiptComponent implements OnInit {
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
