import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customer-type',
  templateUrl: './list-customer-type.component.html',
  styleUrls: ['./list-customer-type.component.sass']
})
export class ListCustomerTypeComponent implements OnInit {
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
  addNew(){

  }

 
 reset(){
   
 }

}
