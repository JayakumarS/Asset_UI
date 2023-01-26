import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BranchService } from '../branch.service';
import { Branch } from '../branch-model';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.sass']
})
export class ListBranchComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "branchcode",
    "branchname",
    "location",
    "companyname",
  ];

  dataSource: ExampleDataSource | null;
  exampleDatabase: BranchService | null;
  docForm: FormGroup;

  

  constructor( 
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public branchService: BranchService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private router: Router,
    private httpService:HttpServiceService,
    private fb: FormBuilder
    ) {
    super();

    this.docForm = this.fb.group({
      branchcode: [""],
      branchname: [""],
      location:[""],
      companyname:[""]
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {

 
  }

  public loadData() {
    this.exampleDatabase = new BranchService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.docForm
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

  editCall(row) {

    this.router.navigate(['/audit/auditableAsset/addAuditableAsset/'+row.assetid]);
  
  }

 

}

export class ExampleDataSource extends DataSource<Branch> {


  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Branch[] = [];
  renderedData: Branch[] = [];
  constructor(
    public exampleDatabase: BranchService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public docForm: FormGroup
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Branch[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList(this.docForm.value);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((branchMaster: Branch) => {
            const searchStr = (
              branchMaster.branchid +
              branchMaster.branchcode +
              branchMaster.branchname +
              branchMaster.location +
              branchMaster.companyname
             
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
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: Branch[]): Branch[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "branchid":
          [propertyA, propertyB] = [a.branchid, b.branchid];
          break;
        case "branchcode":
          [propertyA, propertyB] = [a.branchcode, b.branchcode];
          break;
        case "branchname":
          [propertyA, propertyB] = [a.branchname, b.branchname];
          break;
          case "location":
          [propertyA, propertyB] = [a.location, b.location];
          break;
        case "companyname":
          [propertyA, propertyB] = [a.companyname, b.companyname];
          break;
        
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
