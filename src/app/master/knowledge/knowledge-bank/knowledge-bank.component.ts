import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/common-service/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { serverLocations } from 'src/app/auth/serverLocations';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSort } from '@angular/material/sort';
import { KnowledgeService } from '../knowledge.service';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Profile } from '../knowledge.model';
import { BehaviorSubject, Observable, map, merge } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KnowledgeDeleteComponent } from './knowledge-delete/knowledge-delete.component';
export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'MM/YYYY',
    },
    display: {
      dateInput: 'MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
  };
@Component({
  selector: 'app-knowledge-bank',
  templateUrl: './knowledge-bank.component.html',
  styleUrls: ['./knowledge-bank.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue:MY_DATE_FORMATS},CommonService
  ],
})
export class KnowledgeBankComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  [x: string]: any;
 
    displayedColumns = [
        "fileName",
        "fileId",
        "createdDate",
        // "firstname",
       "actions"
      ];
    
    
    //   dataSource: ExampleDataSource | null;
      exampleDatabase: KnowledgeService | null;
    
      date = new FormControl();
      date1 = new FormControl();
      
      knowledgeBankForm : FormGroup;
      edit: boolean = false;
     
      stars: number[] = [1, 2, 3, 4, 5];
      selectedValue: number;
    
      relationship = new FormControl();
      relationshipList = [];
    
      receiverRegistered: any;
      usedMB: any;
      totalMB: any;
      knowledgebank: any;
      filePath:any;
      id:any;
      role:any;
      RoleID:any;
        // Total storage in bytes
      totalStorage: number = 10490000;
     
    
    
    private acceptFileTypes = ["application/image/jpg","application/image/png","application/image/jpeg"]
    filePathUrl: string;
    certificationForm: any;
    knowledgeBank: any;
    docForm: FormGroup;
    serverURL: any;
    KnowledgeService: any;
    UploadForm: any;
    dataSource: any;
    fetchDetails: any;
    subs: any;



  constructor(
    private commonService: CommonService,private fb: FormBuilder,public route: ActivatedRoute,
    private httpService: HttpServiceService,
    //  private spinner: NgxSpinnerService,
     private snackBar: MatSnackBar,public router:Router,
     public httpClient: HttpClient,
    public dialog: MatDialog, 
    private serverUrl: serverLocations,
    private tokenStorage: TokenStorageService,
    private knowledgeService: KnowledgeService, 

   
 
  ) { 
   super();
   
    
  }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" }; 

  ngOnInit(): void {

     this.loadData();
    // this.knowledgeBankForm = this.fb.group({
    //     uploadfile: [""],
    //     fileName: [""],
    //     fileId: [""],
    //     createdDate:[""],
    //     //  firstname: [""],
    //    });
       

  }

  public loadData() {
    this.exampleDatabase = new KnowledgeService(this.httpClient,this.serverUrl,this.httpService,this.tokenStorage);
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


  onSelectFile(event) {
    var file = event.target.files[0]; 
    if (file.size > 2000000) {
      this.showNotification(
        "snackbar-danger",
        "Please upload less than 2mb",
        "bottom",
        "center"
      );
      this.knowledgeBank.patchValue({
        'uploadfile':"",
        'fileName':""
      })
      this.filePathUrl = "";
      return;
    }
     var fileExtension = file.name;
    var frmData: FormData = new FormData();
    frmData.append("file", file);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "knowledgebankfiles");

    this.httpService.post<any>(this.knowledgeService.fileUploadUrl1, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            this.usedMB = this.formatFileSize(this.usedStorage);
            this.knowledgeBank.patchValue({
              'uploadfile': data.filePath,
              'fileName': file.name,
              'fileId': file.id,
              'createdDate':file.createdDate,
              // 'firstname': file.firstname
            })
            
            this.filePathUrl = data.filePath;
          }
        }
         else {
          this.showNotification(
            "snackbar-danger",
            "Unable to upload file",
            "bottom",
            "center"
          );
          this.knowledgeBank.patchValue({
            'uploadfile':"",
            'fileName':"",
            'fileId':"",
            'createdDate':""

          })
          this.filePathUrl = "";
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload Image",
          "bottom",
          "center"
        );
      }
    });
    this.showNotification(
      "snackbar-success",
      "Added Record Successfully...!!!",
      "bottom",
      "center"
    );
    location.reload();
  }

  deletefile(row){ 
    this.id = row.fileId;
   let tempDirection;
     if (localStorage.getItem("isRtl") === "true") {
       tempDirection = "rtl";
     } else {
       tempDirection = "ltr";
      }
  
        const dialogRef = this.dialog.open(KnowledgeDeleteComponent, {
          height: "270px",
          width: "400px",
          data: row,
          direction: tempDirection,
          disableClose: true
        });
  
      this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
  
       if (data.data == true) {
        // const obj={
        //   deletingId: row.Id
        // }
        //  this.spinner.show();
         this.knowledgeService.knowledgeDelete(this.id).subscribe({
           next: (data) => {
            if (data.success) {
              this.loadData();
              this.showNotification(
                "snackbar-success",
                "Deleted record successfully...!!!",
                "bottom",
                "center"
               );
             }
           },
           error: (error) => {
          }
        });
    
      }
      this.showNotification(
        "snackbar-success",
        "Deleted record successfully...!!!",
        "bottom",
        "center"
      );
      location.reload();
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
  


//   public loadData() {
//     this.exampleDatabase = new KnowledgeService(this.httpClient, this.serverUrl, this.httpService,this.snackBar);
//     this.dataSource = new ExampleDataSource(
//       this.exampleDatabase,
//       this.paginator,
//       this.sort
//     );
//     this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
//       () => {
//         if (!this.dataSource) {
//           return;
//         }
//         // console.log(this.dataSource);
//         this.dataSource.filter = this.filter.nativeElement.value;
//       }
//     );
//  }
}
  export class ExampleDataSource extends DataSource<Profile> {
    filterChange = new BehaviorSubject("");
    closeon: boolean;
    usedMB: any; 
    get filter(): string {
      return this.filterChange.value;
    }
    set filter(filter: string) {
      this.filterChange.next(filter);
    }
    filteredData: Profile[] = [];
    renderedData: Profile[] = [];
    constructor(
      public exampleDatabase: KnowledgeService,
      public paginator: MatPaginator,
      public _sort: MatSort
      
    ) {
      super();
      // Reset to the first page when the user changes the filter.
      this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
    // /* Connect function called by the table to retrieve one stream containing the data to render.* /
    connect(): Observable<Profile[]> {
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
        this.exampleDatabase.dataChange,
        this._sort.sortChange,
        this.filterChange,
        this.paginator.page,
      ];
      
      this.exampleDatabase.getknowledgebankList();
      return merge(...displayDataChanges).pipe(
        map(() => {
          // Filter data
          this.filteredData = this.exampleDatabase.data
            .slice()
            .filter((Profile: Profile) => {
              const searchStr = (
                Profile.fileId +

                Profile.fileName +
                // Profile.fileType +
                // Profile.firstname +
                Profile.createdDate +
                // Profile.fileIcon +
                Profile.uploadfile 
                // Profile.fileId
              
              ).toLowerCase();
              return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
             for(let i=0;i<this.filteredData.length;i++){ 
              const value = this.filteredData[i].fileSize
              const formattedSize = this.formatFileSize(Number(value));  
              if(formattedSize == ''){
                for(let i=0;i<this.filteredData.length;i++){ 
                  this.filteredData[i].fileSize = this.filteredData[i].fileSize
                }
              }else{
                this.filteredData[i].fileSize = formattedSize  
              }
            }
            
           
          // Sort filtered data
          const sortedData = this.sortData(this.filteredData.slice());
         //  Grab the page's slice of the filtered sorted data.
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
  
    // Dynamic Used Storage 
    formatFileSize(size: number): string {
      if (isNaN(size)) {
        return ''; 
      }
      const units = ['bytes', 'KB', 'MB', 'GB'];
      let unitIndex = 0;
    
      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
    
      return `${size.toFixed(2)} ${units[unitIndex]}`;
    }
    /* Returns a sorted copy of the database data. */
    sortData(data: Profile[]): Profile[] {
      if (!this._sort.active || this._sort.direction === "") {
        return data;
      }
      return data.sort((a, b) => {
        let propertyA: number | string = "";
        let propertyB: number | string = "";
        
        switch (this._sort.active) {
          case "fileName":
            [propertyA, propertyB] = [a.fileName, b.fileName];
            break;
          case "fileSize":
            [propertyA, propertyB] = [a.fileSize, b.fileSize];
            break;
          // case "fileType":
          //   [propertyA, propertyB] = [a.fileId, b.fileId];
          //   break;
          // case "firstname":
          //   [propertyA, propertyB] = [a.firstname, b.firstname];
          //   break;
          case "createdDate":
            [propertyA, propertyB] = [a.createdDate, b.createdDate];
            break;
          // case "fileIcon":
          //   [propertyA, propertyB] = [a.fileIcon, b.fileIcon];
          //   break;
            case "uploadfile":
            [propertyA, propertyB] = [a.uploadfile, b.uploadfile];
            break;
            case "fileId":
            [propertyA, propertyB] = [a.fileId, b.fileId];
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

 




///Save 

// onSubmit(){

//   this.UploadForm = this.knowledgeBankForm.value;

//   if(this.docForm.valid){ 
//     this.knowledgeService.saveUploadImage(this.UploadForm,this.router,this.notificationService);{
//     }
//   } else {
//     this.notificationService.showNotification(
//       "snackbar-danger",
//       "Please fill all the required details!",
//       "top",
//       "right");
      
//     }
// }

//   editCall(row){
//     this.id = row.fileId;
//     this.edit =true;
//     let tempDirection;
//     if (localStorage.getItem("isRtl") === "true") {
//       tempDirection = "rtl";
//     } else {
//       tempDirection = "ltr";
//     }
//      const dialogRef = this.dialog.open(SharePopupComponent, {
//       height: "470px",
//       width: "60%",
//       data: {
//         fileName: this.knowledgeBankForm.value.fileName,
//         fileSize: this.knowledgeBankForm.value.fileSize,
//         fileType: this.knowledgeBankForm.value.fileType,
//         uploadfile: this.knowledgeBankForm.value.uploadfile,
//         id:this.id,
//         edit:this.edit
  
//       },
//       direction: tempDirection,
//     });
    
//    }

  // usedStorage(usedStorage: any): any {
  //   throw new Error('Method not implemented.');
  // }


  

  

