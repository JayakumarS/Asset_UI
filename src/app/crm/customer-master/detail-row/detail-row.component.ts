import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-row',
  templateUrl: './detail-row.component.html',
  styleUrls: ['./detail-row.component.sass']
})
export class DetailRowComponent implements OnInit {
  name: String;
  designation: any;
  department: String;
  phoneno : number;
  landline : number;
  email : any;
  constructor() { }

  ngOnInit(): void {
  }

}
