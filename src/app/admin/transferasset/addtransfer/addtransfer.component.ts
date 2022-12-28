import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
 import { TraansferService } from '../transfer-model';
import { transferResultBean } from '../transfer-result-bean';
import { TransferService } from '../transfer.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'app-addtransfer',
  templateUrl: './addtransfer.component.html',
  styleUrls: ['./addtransfer.component.sass']
})
export class AddtransferComponent extends  UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns=[


    "Asset_Code",
    "asset_name",
    "departments",
    "condition",
    "asset_location"
  

  ];
  
  item:any;
  requestId:any;
  edit:boolean=false;
  transferList:[];
  locationList:[];
  assetList:[];
  codeList:[];
  gridList: any = [];
  docForm:FormGroup;
  traansferService:TraansferService
  files: any;
  transferFile:any;
  filePath: any;
  event:any;
  fileuplode: any;
  renderedData: any;
  sortData:any;

  exampleDatabase:TransferService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<TraansferService>(true, []);
   exporter: any;
  private _sort: any;
  filterChange: any;
  filteredData: TraansferService[];


  constructor(private fb: FormBuilder,
    public transferservice:TransferService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private serverUrl:serverLocations,
    private router:Router,
    public httpClient: HttpClient,
    public route: ActivatedRoute,) { 
      super(); 
        this.docForm = this.fb.group({

        tid:[""],
        status: [""],
        department: ["",[Validators.required]],
        location:[""],
        transfer:[""],
        date:[""],
        remarks:[""],
        files:[""],
        transferFile:[""],
        code:[""],
        asset_name:[""],
        condition:[""],
        asset_location:[""],
        departments:[""],
        


     
      });
    }
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild("filter", { static: true }) filter: ElementRef;
    @ViewChild(MatMenuTrigger)
    contextMenu: MatMenuTrigger;
    contextMenuPosition = { x: "0px", y: "0px" };

    ngOnInit(): void {
      
      this.filePath = this.serverUrl.apiServerAddress;
      this.httpService.get<transferResultBean>(this.transferservice.transferListUrl).subscribe(
        (data) => {
          this.transferList = data.transferList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );

      this.httpService.get<transferResultBean>(this.transferservice.locationserviceUrl).subscribe(
        (data) => {
          this.locationList = data.locationList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );

      this.route.params.subscribe(params => {
       if(params.id!=undefined && params.id!=0){
        this.requestId = params.id;
        this.edit=true;
        this.getNonGSTFileDetails(this.requestId) ;
 
       }
      });
      
      this.route.params.subscribe(params => {
        if(params.id!=undefined && params.id!=0){
         this.requestId = params.id;
         this.edit=true;
         //For User login Editable mode
         this.fetchDetails(this.requestId) ;
  
        }
       });



      
      this.httpService.get<transferResultBean>(this.transferservice.codeserviceUrl).subscribe(
        (data) => {
          this.codeList = data.codeList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      
    }
    onSubmit(){
      this.traansferService = this.docForm.value;
      console.log(this.traansferService)
      this.transferservice.addtransfer(this.traansferService);
      this.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "bottom",
        "center"
      );
      this.router.navigate(['/admin/transferasset/listtransfer']);
    }

    
    fetchDetails(transfer: any): void {
      this.httpService.get(this.transferservice.editTransfer + "?transfer=" + transfer).subscribe((res: any) => {
        console.log(transfer);
        this.files = res.transferBean.transferFile
        this.docForm.patchValue({
          'status':res.transferBean.status,
          'department': parseInt(res.transferBean.department),
          'location': parseInt(res.transferBean.location),
          'transfer': res.transferBean.transfer,
          'date' : res.transferBean.date,
          'remarks' : res.transferBean.remarks,
          'files' : res.transferBean.transferFile,
          'transferFile':res.transferBean.transferFile,
          'code':res.transferBean.code,

           

       })
        },
        (err: HttpErrorResponse) => {
        }
      );
    }
    
  onCancel(){ 
    this.router.navigate(['/admin/transferasset/listtransfer']);
  }
  onTransfer(): void{
    this.traansferService=this.docForm.value;
    this.httpService.get(this.transferservice.transferCodeAll + "?transfer=" + this.docForm.controls.code.value).subscribe((res: any) => {
       console.log(res);
       this.gridList=res.codeList;
  
      },
      (err: HttpErrorResponse) => {
      }
    );
  } 

  onReset()
  {
    this.docForm = this.fb.group({
        tid:[""],
        status: [""],
        department: [""],
        location:[""],
        transfer:[""],
        date:[""],
        remarks:[""],
        files:[""],
        asset:[""]
       
  });}

  getNonGSTFileDetails(event) {
    var docfile = event.target.files[0];
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName", fileExtension);
    console.log(frmData);

    this.httpService.post<any>(this.transferservice.addCreditFiles, frmData).subscribe({
      next: (data) => {
        
        console.log(data);
        if(data.success){
          this.docForm.patchValue({
            'transferFile': data.filePath       
         })
        }else{
          this.showNotification(
            "snackbar-danger",
            data.message,
            "bottom",
            "center"
          );
        }
        
      },
      error: (error) => {

      }
    });
    }

    update(){

      this.traansferService = this.docForm.value;
      this.traansferService.tid=this.requestId;
      this.transferservice.transferUpdate(this.traansferService);
      this.showNotification(
        "snackbar-success",
        "Edit Record Successfully...!!!",
        "bottom",
        "center"
      );
      this.router.navigate(['/admin/transferasset/listtransfer']);
  
    }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  
}

export class ExampleDataSource extends DataSource<TraansferService> {
  [x: string]: any;
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: TraansferService[] = [];
  renderedData: TraansferService[] = [];
  constructor(
    public exampleDatabase: TransferService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TraansferService[]> {
   
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCodeList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((traansferService: TraansferService) => {
            const searchStr = (
             traansferService.asset_code+
             traansferService.asset_name+
             traansferService.condition+
             traansferService.asset_location+
             traansferService.departments
             
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
      
        const sortedData = this.sortData(this.filteredData.slice());
        
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
  // /** Returns a sorted copy of the database data. */
  // sortData(data: TraansferService[]): TraansferService[] {
  //   if (!this._sort.active || this._sort.direction === "") {
  //     return data;
  //   }
  //   return data.sort((a, b) => {
  //     let propertyA: number | string | boolean = "";
  //     let propertyB: number | string | boolean = "";
  //     switch (this._sort.active) {
  //       case "asset_code":
  //         [propertyA, propertyB] = [a.asset_code, b.asset_code];
  //         break;
       
  //         case "asset_name":
  //         [propertyA, propertyB] = [a.asset_name, b.asset_name];
  //         break;

  //         case "condition":
  //         [propertyA,propertyB]=[a.condition,b.condition];
  //         break;

  //         case "asset_location":
  //         [propertyA,propertyB]=[a.asset_location,b.asset_location];
  //         break;

  //         case "departments":
  //           [propertyA,propertyB]=[a.departments,b.departments];
  //           break;
  //     }
  //     const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
  //     const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
  //     return (
  //       (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
  //     );
  //   });
  // }
}
