import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-entry-detail-row',
  templateUrl: './sales-entry-detail-row.component.html',
  styleUrls: ['./sales-entry-detail-row.component.sass']
})
export class SalesEntryDetailRowComponent implements OnInit {
  objective: any;
  commodity: any;
  date: any;
  nextCallDate : any;
  status : any;
  conditionSupport : any;
  reasonSupport : any;
  reasonNotSupport :any;
  remarks : any;
  pol : any;
  pod : any;
  containerType : any;
  boxes : any;
  expectedOn : any;

  // Boo DtlHdr beans

  processSeqNo : any;
  processName : any;
  approxTime : any;
  processRemarks : any;

  constructor() { }

  ngOnInit(): void {
  }

}
