import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { Auditresultbean } from '../audit-result-bean';


import { Addaudit, Aidaudit } from '../audit.model';
import { AuditService } from '../audit.service';
import { DeleteauditComponent } from './deleteaudit/deleteaudit.component';

@Component({
  selector: 'app-manage-audit',
  templateUrl: './manage-audit.component.html',
  styleUrls: ['./manage-audit.component.sass']
})

export class ManageAuditComponent implements OnInit {
  displayedColumns = [
  
  
   
      "startdate",
      "enddate",
      "auditname",
      "auditArray",
      "actions"
    ];
  auditlist:[""];
  loacationlist:[""];
  departmentlist:[""];
  categorylist:[""];



  

  
  docForm: FormGroup;
  Formdoc: FormGroup;
  billOfMaterialDtlObjBean: FormArray;
  requestId: any;
  edit:boolean=false;
   addaudit : Addaudit;
   auditArray: any;
   aidaudit : Aidaudit;
  
   


 
  subs: any;
  dataSource: ExampleDataSource | null;
  exampleDatabase: AuditService | null;
  selection = new SelectionModel<Addaudit>(true, []);
  index: number;
  id: number;

 
  constructor(private fb: FormBuilder,
    private auditservice : AuditService,
    private commonService: CommonService,
    private httpService: HttpServiceService,
    // private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public auditService: AuditService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
  ){
  }

  
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild("filter", { static: true }) filter: ElementRef;
    @ViewChild(MatMenuTrigger)
    contextMenu: MatMenuTrigger;
    contextMenuPosition = { x: "0px", y: "0px" };
  
  
    refresh(){
      this.loadData();
    }
  
    public loadData() {
      this.exampleDatabase = new AuditService(this.httpClient, this.serverUrl, this.httpService);
      this.dataSource = new ExampleDataSource(
        this.exampleDatabase,
        this.paginator,
        this.sort
      );
      // this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      //   () => {
      //     if (!this.dataSource) {
      //       return;
      //     }
      //     this.dataSource.filter = this.filter.nativeElement.value;
      //   }
      // );
    }
  
  
    editCall(row) {
  
      this.router.navigate(['/admin/audit/auditlist/'+row.id]);
  
    }
    deleteItem(row){

      this.id = row.id;
      let tempDirection;
      if (localStorage.getItem("isRtl") === "true") {
        tempDirection = "rtl";
      } else {
        tempDirection = "ltr";
      }
      const dialogRef = this.dialog.open(DeleteauditComponent, {
        height: "270px",
        width: "400px",
        data: row,
        direction: tempDirection,
      });
      this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
        
        this.loadData();
          this.showNotification(
            "snackbar-success",
            "Delete Record Successfully...!!!",
            "bottom",
            "center"
          );
        
        // else{
        //   this.showNotification(
        //     "snackbar-danger",
        //     "Error in Delete....",
        //     "bottom",
        //     "center"
        //   );
        // }
      });
  
    }
  
  ngOnInit(): void {
    this.docForm = this.fb.group({
      auditArray: [""],
      startdate:[""],
      enddate:[""],
      auditname:["", [Validators.required]],
      id:[""]

   
    });

    this.Formdoc = this.fb.group({
      uploadImg:[""],
      auditfile:[""],
      auditArraya: [""],
      startdatea:[""],
      enddatea:[""],
      auditnamea:["", [Validators.required]],
      auditNo:[""],


       manageAuditDtlObjBean: this.fb.array([
        this.fb.group({
          category:["", [Validators.required]],
          location:[""],
          department:[""],
          audituser:[""],
          aidid:[""],
          auditNo:[""],
          id:[""]
         
         
        }) 
       ])

   
    });

    this.loadData();
   
    this.httpService.get<any>(this.commonService.activityserviceurl).subscribe({
      next: (data) => {
        this.auditlist = data;
      },
      error: (error) => {

      }
    }
    );

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
    });

    this.loadData();
 
    this.httpService.get<any>(this.commonService.getCategoryDropdown).subscribe({
      next: (data) => {
        this.categorylist = data;
      },
      error: (error) => {

      }
    }
    );

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
    });

    this.loadData();
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.loacationlist = data;
      },
      error: (error) => {

      }
    }
    );
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
    });

    this.loadData();
    this.httpService.get<any>(this.commonService.getDepartmentDropdown).subscribe({
      next: (data) => {
        this.departmentlist = data;
      },
      error: (error) => {

      }
    }
    );
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
    });
 }

 onSubmit(){
  
  this.addaudit = this.docForm.value;
    console.log(this.addaudit);
    this.auditservice.saveaudit(this.addaudit);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.loadData();
  //  location.reload()
    // this.router.navigate(['/admin/audit/auditlist/0']);
    
  }

  onSubmitaid(){
  
    this.aidaudit = this.Formdoc.value;
      console.log(this.aidaudit);
      this.auditservice.saveauditAided(this.aidaudit);
      this.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "bottom",
        "center"
      );
      this.loadData();
     location.reload()
      // this.router.navigate(['/admin/audit/auditlist/0']);
      
    }


  addRow(){
    let bomDtlArray = this.Formdoc.controls.manageAuditDtlObjBean as FormArray;
    let arraylen = bomDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      category:["", [Validators.required]],
          location:[""],
          department:[""],
          audituser:[""],
          aidid:[""],
    })
    bomDtlArray.insert(arraylen,newUsergroup);

  }

  removeRow(index){

   
  let bomDtlArray = this.Formdoc.controls.manageAuditDtlObjBean as FormArray;
  bomDtlArray.removeAt(index);
  
    

  }

  fetchDetails(id:number){
    this.httpService.get(this.auditservice.editDesignationMaster+"?id="+id).subscribe((res: any)=> {
      console.log(id);

      this.docForm.patchValue({
        
        'startdate': res.manageAuditBean.startdate,
        'enddate': res.manageAuditBean.enddate,
        'auditname': res.manageAuditBean.auditname,
        'auditArray': res.manageAuditBean.auditArray,
        'id': res.manageAuditBean.id,
   
   
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  

  }
  update(){

    this.addaudit = this.docForm.value;
    this.auditservice.AuditUpdate(this.addaudit);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
   
    
    this.reset()
   

    // this.router.navigate(['/admin/audit/auditlist/0']);
   

  }

  reset(){
    this.docForm = this.fb.group({
      startdate: [""],
      enddate: [""],
      auditname: [""],
      auditArray: [""],
      id:[""]
      
  })
}
  onCancel(){
    this.docForm = this.fb.group({
      startdate: [""],
      enddate: [""],
      auditname: [""],
      auditArray: [""],
      
  })
    this.router.navigate(['/admin/audit/auditlist/0']);

  }

    showNotification(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }
  
  // context menu
    onContextMenu(event: MouseEvent, item: Addaudit) {
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + "px";
      this.contextMenuPosition.y = event.clientY + "px";
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem("mouse");
      this.contextMenu.openMenu();
    }

    // File upload
getCreditFile(event) {
  var docfile = event.target.files[0];
  var fileExtension = docfile.name;
  var frmData: FormData = new FormData();
  frmData.append("file", docfile);
  frmData.append("fileName",fileExtension);
  console.log(frmData);
  
  // var data = this.httpService.postData(this.fileUploadService.addFiles,frmData);
  // console.log(data);
  
  this.httpService.post<any>(this.auditService.addAssetUploadFiles, frmData).subscribe(data => {
      console.log(data);
      if(data.success){
        this.Formdoc.patchValue({
          'auditfile': data.filePath     
         
       })
      }
      else{
        this.showNotification(
          "snackbar-success",
          "Edit Record Successfully...!!!",
          "bottom",
          "center"
        );

        
      }
      
      },
      (err: HttpErrorResponse) => {
        
    });

  }
  
  }
  

  
  export class ExampleDataSource extends DataSource<Addaudit> {
    filterChange = new BehaviorSubject("");
    get filter(): string {
      return this.filterChange.value;
    }
    set filter(filter: string) {
      this.filterChange.next(filter);
    }
    filteredData: Addaudit[] = [];
    renderedData: Addaudit[] = [];
    constructor(
      public exampleDatabase: AuditService,
      public paginator: MatPaginator,
      public _sort: MatSort
    ) {
      super();
      // Reset to the first page when the user changes the filter.
      this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
   /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Addaudit[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      // this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((addaudit: Addaudit) => {
            const searchStr = (
              addaudit.id+
              addaudit.startdate +
              addaudit.enddate +
              addaudit.auditname +
              addaudit.auditArray 
             
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
    sortData(data: Addaudit[]): Addaudit[] {
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
          case "startdate":
            [propertyA, propertyB] = [a.startdate, b.startdate];
            break;
          case "enddate":
            [propertyA, propertyB] = [a.enddate, b.enddate];
            break;
            case "auditname":
            [propertyA, propertyB] = [a.auditname, b.auditname];
            break;
            case "auditArray":
            [propertyA, propertyB] = [a.auditArray, b.auditArray];
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
  
  function getCreditFile(event: MouseEvent) {
    throw new Error('Function not implemented.');
  } 
