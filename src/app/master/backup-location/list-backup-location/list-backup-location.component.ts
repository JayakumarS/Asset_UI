

import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BackupLocation } from '../backup-location.model';
import { BackupLocationService } from '../backup-location.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DeleteBackupLocationComponent } from './delete-backup-location/delete-backup-location.component';
import * as XLSX from 'xlsx'; // Import xlsx library

@Component({
  selector: 'app-list-backup-location',
  templateUrl: './list-backup-location.component.html',
  styleUrls: ['./list-backup-location.component.sass']
})
export class ListBackupLocationComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "backupName",
    "serverIp",
    "actions"
  ];

  url: string;
  dataSource: ExampleDataSource | null;
  widgets: boolean = false;
  exampleDatabase: BackupLocationService | null;
  id: number;
  backupLocation: BackupLocation;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public backupLocationService: BackupLocationService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    private router: Router,
    private tokenStorage: TokenStorageService,
  ) { 
    super();
    {
    }
    

  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };


  ngOnInit(): void {
    this.loadData();

    this.url=this.router.url;
    if(this.url.includes("allMaster")){
    this.widgets = true
    }else if(this.url.includes('list-backup-location')){
    this.widgets = false

    };
  }

  public loadData() {
        this.exampleDatabase = new BackupLocationService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
        this.dataSource = new ExampleDataSource(
          this.exampleDatabase,
          this.paginator,
          this.sort
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

  // exporttoExcelReport(): void {
  //   // Prepare the data to export
  //   const exportData = this.dataSource ? this.dataSource.renderedData : [];
  
  //   if (exportData.length === 0) {
  //     this.showNotification('snackbar-warning', 'No data to export!', 'bottom', 'center');
  //     return;
  //   }
  
  //   // Convert the data to a format suitable for Excel
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData.map(item => ({
  //     'Backup Name': item.backupName,
  //     'Server Ip': item.serverIp,
  //     // Check if locationName is an array, if so join its values, otherwise use the value directly
  //     'Location Name': Array.isArray(item.locationName) ? item.locationName.join(', ') : item.locationName,
  //     // Similarly for location
  //     'Location': Array.isArray(item.location) ? item.location.join(', ') : item.location
  //   })));
  
  //   // Create a new workbook
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Backup Locations');
  
  //   // Export to Excel
  //   XLSX.writeFile(wb, 'Backup_Locations_Report.xlsx');
  // }


  exporttoExcelReport() {
    this.spinner.show();
    // const obj = {
    //   vCode : Array.isArray(this.docForm.value.vesselcode) ? this.docForm.value.vesselcode.map((item) => item.id) : [],
    //   dCode : Array.isArray(this.docForm.value.department) ? this.docForm.value.department.map((item) => item.id) : [],
    //   oYear : Array.isArray(this.docForm.value.orderYear) ? this.docForm.value.orderYear.map((item) => item.id) : []
    // };
    this.httpService.get<any>(this.backupLocationService.sampleexportExcel).subscribe(data => {
      if (data) {
        const fileUrl = this.serverUrl.apiServerAddress+"backup_location/BackupLocationReport.xls";
        this.spinner.hide(); 
        fetch(fileUrl).then(response => response.blob()).then(blob => {
          const a = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = "BackupLocationReport.xls";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error downloading file:', error));
      }
      else {
        this.spinner.hide();

        this.showNotification(
          "snackbar-danger",
          data.message,
          "bottom",
          "center"
        );
      }
    })
 
  }

  // exporttoExcelReport(): void {
  //   this.backupLocationService.exportExcel();



  // }



  addPage(){
    
    this.url=this.router.url;
    if(this.url.includes("allMaster")){
    window.sessionStorage.setItem("propFrom", "prop");
    this.router.navigate(['/master/backup-location/add-backup-location/0']);
    }else if(this.url.includes('list-backup-location')){
    window.sessionStorage.setItem("propFrom", "normal");
    this.router.navigate(['/master/backup-location/add-backup-location/0']);
    };
  }

  editCall(row) {
    this.url=this.router.url;
    if(this.url.includes("allMaster")){
      window.sessionStorage.setItem("propFrom", "prop");
      this.router.navigate(['/master/backup-location/add-backup-location/'+row.locationId]);
    }else if(this.url.includes('list-backup-location')){
      window.sessionStorage.setItem("propFrom", "normal");
      this.router.navigate(['/master/backup-location/add-backup-location/'+row.locationId]);
    };
  }

  viewCall(row) {

    this.router.navigate(['/master/backup-location/view-backup-location/', row.locationId]);

  }


  deleteItem(row){
        
        this.id = row.locationId;
          let tempDirection;
          if (localStorage.getItem("isRtl") === "true") {
            tempDirection = "rtl";
          } else {
            tempDirection = "ltr";
          }
          const dialogRef = this.dialog.open(DeleteBackupLocationComponent, {
            height: "270px",
            width: "400px",
            data: row,
            direction: tempDirection,
          });
          this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
            if (data.data == true) {
              
              this.spinner.show();
              this.backupLocationService.deleteBackupLocationList(this.id).subscribe({
                next: (data) => {
                  this.spinner.hide();
                  if (data.success) {
                    this.loadData();
                    this.showNotification(
                      "snackbar-success",
                      "Delete Record Successfully...!!!",
                      "bottom",
                      "center"
                    );
                  }
                  else{
                    this.showNotification(
                      "snackbar-danger",
                      "You Can't Delete Related Data Exist...!!!",
                      "bottom",
                      "center"
                    );
                  }
                },
                error: (error) => {
                  this.spinner.hide();
                }
              });
        
            }else{
              this.loadData();
            }
            
        });
      
    }

    showNotification(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

    onContextMenu(event: MouseEvent, item: BackupLocation) {
          event.preventDefault();
          this.contextMenuPosition.x = event.clientX + "px";
          this.contextMenuPosition.y = event.clientY + "px";
          this.contextMenu.menuData = { item: item };
          this.contextMenu.menu.focusFirstItem("mouse");
          this.contextMenu.openMenu();
        }

}

export class ExampleDataSource extends DataSource<BackupLocation> {
  filterChange = new BehaviorSubject("");
  url: any;
  router: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: BackupLocation[] = [];
  renderedData: BackupLocation[] = [];
  constructor(
    public exampleDatabase: BackupLocationService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<BackupLocation[]> {
   
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    ];
    this.exampleDatabase.getAllList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
       
          .slice()
          .filter((BackupLocationService: BackupLocation) => {
            const searchStr = (
              BackupLocationService.backupName+
              BackupLocationService.serverIp
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
      
        const sortedData = this.sortData(this.filteredData.slice());
        console.log(this.exampleDatabase.data);
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
  sortData(data: BackupLocation[]): BackupLocation[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean = "";
      let propertyB: number | string | boolean = "";
      switch (this._sort.active) {
        case "backupName":
          [propertyA, propertyB] = [a.backupName, b.backupName];
          break;
        case "serverIp":
          [propertyA, propertyB] = [a.serverIp, b.serverIp];
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
