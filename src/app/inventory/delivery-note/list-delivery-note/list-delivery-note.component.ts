import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-delivery-note',
  templateUrl: './list-delivery-note.component.html',
  styleUrls: ['./list-delivery-note.component.sass']
})
export class ListDeliveryNoteComponent implements OnInit {
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
