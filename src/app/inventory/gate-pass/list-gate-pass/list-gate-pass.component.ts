import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-gate-pass',
  templateUrl: './list-gate-pass.component.html',
  styleUrls: ['./list-gate-pass.component.sass']
})
export class ListGatePassComponent implements OnInit {
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
