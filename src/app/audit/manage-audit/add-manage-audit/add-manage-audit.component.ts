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
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ManageAuditServiceService } from '../manage-audit-service.service';
import { ManageAudit } from '../manage-audit.model';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@Component({
  selector: 'app-add-manage-audit',
  templateUrl: './add-manage-audit.component.html',
  styleUrls: ['./add-manage-audit.component.sass'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
      },
  } },CommonService
  ]
})
export class AddManageAuditComponent implements OnInit {

docForm: FormGroup;
Formdoc: FormGroup;
requestId: any;
edit:boolean=false;

selection = new SelectionModel<ManageAudit>(true, []);
id: number;
  auditList: any;
  categoryList: any;
  loacationList: any;
  departmentList: any;
constructor(private fb: FormBuilder,
  private commonService: CommonService,
  private httpService: HttpServiceService,
  // private snackBar:MatSnackBar,
  public route: ActivatedRoute,
  private router:Router,
  public httpClient: HttpClient,
  public manageAuditServiceService: ManageAuditServiceService,
  public dialog: MatDialog,
  private snackBar: MatSnackBar,
  private serverUrl: serverLocations,){
}


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };


  


  editCall(row) {

    this.router.navigate(['/admin/audit/auditlist/'+row.id]);

  }
  

ngOnInit(): void {
  this.docForm = this.fb.group({
    
    startDate:["",[Validators.required]],
    startDateObj:[""],
    endDate:["",[Validators.required]],
    endDateObj:[""],
    auditName:["", [Validators.required]],
    auditField: ["", [Validators.required]],
    auditType: ["Self"],
    manageAuditDtlObjBean: this.fb.array([
      this.fb.group({
        category:["", [Validators.required]],
        location:[""],
        department:[""]
      }) 
    ])
  });

  this.Formdoc = this.fb.group({
    uploadImg:[""],
    auditfile:[""],
    auditArraya: [""],
    startdatea:[""],
    enddatea:[""],
    auditType: ["Aided"],
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

 
  this.httpService.get<any>(this.manageAuditServiceService.auditFieldListUrl).subscribe({
    next: (data) => {
      this.auditList = data.auditfielslist;
    },
    error: (error) => {

    }
  });

  this.httpService.get<any>(this.manageAuditServiceService.categoryUrl).subscribe({
    next: (data) => {
      this.categoryList = data.categoryList;
    },
    error: (error) => {

    }
  }
  );


  this.httpService.get<any>(this.manageAuditServiceService.locationUrl).subscribe({
    next: (data) => {
      this.loacationList = data.locationList;
    },
    error: (error) => {

    }
  } );
  this.httpService.get<any>(this.manageAuditServiceService.departmentUrl).subscribe({
    next: (data) => {
      this.departmentList = data.departmentList;
    },
    error: (error) => {

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

}

onSubmitSelf(){
if(this.docForm.valid){
  this.httpService.post<any>(this.manageAuditServiceService.save, this.docForm.value).subscribe(data => {
    if(data.success){
      this.showNotification(
        "snackbar-success",
        "Record Added Successfully...!!!",
        "bottom",
        "center"
      );
      this.resetSelf();
      this.router.navigate(['audit/manageaudit/listManageAudit']);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        data.message + "...!!!",
        "bottom",
        "center"
      );
    }
    
    },
    (err: HttpErrorResponse) => {
      
  });
}
  

}


onSubmitAided(){
   // this.manageAuditServiceService.saveauditAided(this.Formdoc.value);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
  }


addRowSelf(){
  let dtlArray = this.docForm.controls.manageAuditDtlObjBean as FormArray;
  let arraylen = dtlArray.length;
  let newUsergroup: FormGroup = this.fb.group({
        category:["", [Validators.required]],
        location:[""],
        department:[""]
  })
  dtlArray.insert(arraylen,newUsergroup);

}

removeRowSelf(index){
  let dtlArray = this.docForm.controls.manageAuditDtlObjBean as FormArray;
  dtlArray.removeAt(index);

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
fetchDetails(id){
  this.httpService.get(this.manageAuditServiceService.edit+"?id="+id).subscribe((res: any)=> {
    console.log(res);
    this.docForm.patchValue({
      'startDateObj': this.commonService.getDateObj(res.manageAuditBean.startDate),
      'startDate': res.manageAuditBean.startDate,
      'endDateObj': this.commonService.getDateObj(res.manageAuditBean.endDate),
      'endDate': res.manageAuditBean.endDate,
      'auditName': res.manageAuditBean.auditName,
      'auditField': res.manageAuditBean.auditField
   })  

   
   
   let manageAuditDtlArray = this.docForm.controls.manageAuditDtlObjBean as FormArray;
   manageAuditDtlArray.removeAt(0);
   if(res.manageAuditBean.manageAuditDtlObjBean!=null){

   
    res.manageAuditBean.manageAuditDtlObjBean.forEach(element => {
          let manageAuditDtlArray = this.docForm.controls.manageAuditDtlObjBean as FormArray;
          let arraylen = manageAuditDtlArray.length;
          let newUsergroup: FormGroup = this.fb.group({
            category:[element.category],
            location:[element.location],
            department:[element.department]
        })
        manageAuditDtlArray.insert(arraylen,newUsergroup);
      });
    }
    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );

}
updateSelf(){

  this.manageAuditServiceService.AuditUpdate(this.docForm.value);
  this.showNotification(
    "snackbar-success",
    "Edit Record Successfully...!!!",
    "bottom",
    "center"
  );

}

resetSelf(){
  this.docForm = this.fb.group({
    
    startDate:[""],
    startDateObj:[""],
    endDate:[""],
    endDateObj:[""],
    auditName:["", [Validators.required]],
    auditField: [""],
    auditType: ["Self"],
    manageAuditDtlObjBean: this.fb.array([
      this.fb.group({
        category:["", [Validators.required]],
        location:[""],
        department:[""]
      }) 
    ])
  });
}
onCancel(){
  this.router.navigate(['audit/manageaudit/listManageAudit']);

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
  onContextMenu(event: MouseEvent, item: ManageAudit) {
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

this.httpService.post<any>(this.manageAuditServiceService.addAssetUploadFiles, frmData).subscribe(data => {
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

getDateString(event,inputFlag,index){
  let cdate = this.commonService.getDate(event.target.value);
  if(inputFlag=='startDate'){
    this.docForm.patchValue({startDate:cdate});
  }else if(inputFlag=='endDate'){
    this.docForm.patchValue({endDate:cdate});
  }
 
}

}
