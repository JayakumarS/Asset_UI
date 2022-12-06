import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-territory',
  templateUrl: './list-territory.component.html',
  styleUrls: ['./list-territory.component.sass']
})
export class ListTerritoryComponent implements OnInit {

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
