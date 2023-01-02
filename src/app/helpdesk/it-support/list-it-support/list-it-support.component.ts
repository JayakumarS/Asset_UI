import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable, merge, map, fromEvent } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Itsupport } from '../it-support.model';
import { Itsupportservice } from '../it-support.service';

@Component({
  selector: 'app-list-it-support',
  templateUrl: './list-it-support.component.html',
  styleUrls: ['./list-it-support.component.sass']
})
export class ListItSupportComponent implements OnInit {
  displayedColumns = [
    "ticketno",
    "tickettype",
    "asset",
    "assetlocation",
    "category",
    "priority",
    "status",
    "ticketgrp",
    "assignee",
    "tatinday",
    "reportedby"
  ];



  docForm: FormGroup
  fb: any;
  itsupport:Itsupport
  exampleDatabase: Itsupportservice;
  httpClient: HttpClient;
  serverUrl: serverLocations;
  httpService: HttpServiceService;
  tokenStorage: TokenStorageService;
  dataSource: ExampleDataSource;
  paginator: MatPaginator;
  sort: MatSort;
  subs: any;
  filter: any;
  constructor() { 

  }

  ngOnInit(): void {
    this.docForm = this.fb.group({
    
      reportdate:[""],
      uploadImg:["", [Validators.required]],
 

   
    });
  }
  onclick(){

    
  }

  public loadData() {
    this.exampleDatabase = new Itsupportservice(this.httpClient, this.serverUrl, this.httpService, this.tokenStorage);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter?.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter?.nativeElement?.value;
      }
    );
  }
  
  editCall(row){

  }
  deleteItem(row) {


  }
}
export class ExampleDataSource extends DataSource<Itsupport> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value.trim();
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Itsupport[] = [];
  renderedData: Itsupport[] = [];
  constructor(
    public exampleDatabase: Itsupportservice,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Itsupport[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getItList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((itsupport: Itsupport) => {
            const searchStr = (
              itsupport.ticketno +
              itsupport.tickettype +
              itsupport.asset +
              itsupport.assetlocation +
              itsupport.category +
              itsupport.priority +
              itsupport.status +
              itsupport.ticketgrp +
              itsupport.assignee +
              itsupport.tatinday +
              itsupport.reportedby+
              itsupport.id
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: Itsupport[]): Itsupport[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      //For to sort number or string Added by GOKUL
      let isNumber: boolean = false;
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "ticketno":
          [propertyA, propertyB] = [a.ticketno, b.ticketno];
          break;
        case "tickettype":
          [propertyA, propertyB] = [a.tickettype, b.tickettype];
          break;
        case "asset":
          [propertyA, propertyB] = [a.asset, b.asset];
          break;
        case "assetlocation":
          [propertyA, propertyB] = [a.assetlocation, b.assetlocation];
          break;
        case "status":
          [propertyA, propertyB] = [a.status, b.status];
          break;
          case "category":
            [propertyA, propertyB] = [a.category, b.category];
            break;
          case "priority":
            [propertyA, propertyB] = [a.priority, b.priority];
            break;
          case "ticketgrp":
            [propertyA, propertyB] = [a.ticketgrp, b.ticketgrp];
            break;
          case "assignee":
            [propertyA, propertyB] = [a.assignee, b.assignee];
            break;
          case "tatinday":
              [propertyA, propertyB] = [a.tatinday, b.tatinday];
              break;
          case "reportedby":
              [propertyA, propertyB] = [a.reportedby, b.reportedby];
              break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      if (isNumber) {
        return (
          (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
        );
      } else {
        return (
          (valueA.toString().toLowerCase() < valueB.toString().toLowerCase() ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
        );
      }

    });
  }
}
