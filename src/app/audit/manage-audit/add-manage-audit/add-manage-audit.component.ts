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
import { MatTabGroup } from '@angular/material/tabs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY'
        },
      }
    }, CommonService
  ]
})
export class AddManageAuditComponent implements OnInit {
  docForm: FormGroup;
  Formdoc: FormGroup;
  manageAudit: ManageAudit;
  requestId: any;
  edit: boolean = false;
  selection = new SelectionModel<ManageAudit>(true, []);
  @ViewChild('tabs') tabGroup: MatTabGroup;
  id: number;
  loacationList: any;
  companyList: any;
  branchList: any;
  auditorList: any;

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private router: Router,
    public httpClient: HttpClient,
    public manageAuditServiceService: ManageAuditServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,
    private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService) {

      this.docForm = this.fb.group({
        auditId: [""],
        startDate: ["", [Validators.required]],
        startDateObj: [""],
        endDate: ["", [Validators.required]],
        endDateObj: [""],
        auditName: ["", [Validators.required]],
        auditorId: [""],
        locationId: ["", [Validators.required]],
        auditCompanyId: [this.tokenStorage.getCompanyId()],
        auditbranchId: [this.tokenStorage.getBranchId()],
        auditType: ["Self"],
        loginedUser: this.tokenStorage.getUserId(),
        companyId: this.tokenStorage.getCompanyId(),
        branchId: this.tokenStorage.getBranchId()
      });
  
      this.Formdoc = this.fb.group({
        auditId: [""],
        startDate: ["", [Validators.required]],
        startDateObj: [""],
        endDate: ["", [Validators.required]],
        endDateObj: [""],
        auditName: ["", [Validators.required]],
        auditorId: ["", [Validators.required]],
        locationId: ["", [Validators.required]],
        auditCompanyId: ["", [Validators.required]],
        auditbranchId: ["", [Validators.required]],
        auditType: ["Aided"],
        loginedUser: this.tokenStorage.getUserId(),
        companyId: this.tokenStorage.getCompanyId(),
        branchId: this.tokenStorage.getBranchId()
      });

  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };



  ngOnInit(): void {
     this.httpService.get<any>(this.commonService.getAuditorDropdown).subscribe({
      next: (data) => {
        this.auditorList = data;
      },
      error: (error) => {
      }
    });
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.loacationList = data;
      },
      error: (error) => {
      }
    });
    this.httpService.get<any>(this.commonService.getcompanyDropdown).subscribe({
      next: (data) => {
        this.companyList = data;
      },
      error: (error) => {
      }
    });
    this.httpService.get<any>(this.commonService.getBranchDropdown).subscribe({
      next: (data) => {
        this.branchList = data;
      },
      error: (error) => {
      }
    });
    



    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        //For User login Editable mode
        this.fetchDetails(this.requestId);
      }
    });
  }

  onSubmitSelf() {
    if (this.docForm.valid) {
      this.manageAudit = this.docForm.value;
      this.spinner.show();
      this.manageAuditServiceService.addManageAudit(this.manageAudit).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Record Added successfully...",
              "bottom",
              "center"
            );
            this.onCancel();
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Added...!!!",
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        }
      });
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }

  onSubmitAided() {
    if (this.Formdoc.valid) {
      this.manageAudit = this.Formdoc.value;
      this.spinner.show();
      this.manageAuditServiceService.addManageAudit(this.manageAudit).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Record Added successfully...",
              "bottom",
              "center"
            );
            this.onCancel();
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Added...!!!",
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        }
      });
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }

  }

  fetchDetails(id) {
    const obj = {
      editId: id
    }
    this.spinner.show();
    this.manageAuditServiceService.editManageAudit(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
      if (res.manageAudit.auditType == "Self") {
        this.tabGroup.selectedIndex = 0;
        this.docForm.patchValue({
          'auditId': res.manageAudit.auditId,
          'startDateObj': this.commonService.getDateObj(res.manageAudit.startDate),
          'startDate': res.manageAudit.startDate,
          'endDateObj': this.commonService.getDateObj(res.manageAudit.endDate),
          'endDate': res.manageAudit.endDate,
          'auditName': res.manageAudit.auditName,
          'locationId': res.manageAudit.locationId,
          'auditCompanyId': res.manageAudit.auditCompanyId,
          'auditbranchId': res.manageAudit.auditbranchId
        })
      } else if (res.manageAudit.auditType == "Aided") {
        this.tabGroup.selectedIndex = 1;
        this.Formdoc.patchValue({
          'auditId': res.manageAudit.auditId,
          'startDateObj': this.commonService.getDateObj(res.manageAudit.startDate),
          'startDate': res.manageAudit.startDate,
          'endDateObj': this.commonService.getDateObj(res.manageAudit.endDate),
          'endDate': res.manageAudit.endDate,
          'auditName': res.manageAudit.auditName,
          'auditorId': res.manageAudit.auditorId,
          'locationId': res.manageAudit.locationId,
          'auditCompanyId': res.manageAudit.auditCompanyId,
          'auditbranchId': res.manageAudit.auditbranchId
        })
      }
    },
    error: (error) => {
      this.spinner.hide();
      // error code here
    }
  });
}

  updateSelf() {
    if (this.docForm.valid) {
      this.manageAudit = this.docForm.value;
      this.spinner.show();
      this.manageAuditServiceService.updateManageAudit(this.manageAudit).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Record Updated Successfully",
              "bottom",
              "center"
            );
            this.onCancel();
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Updated Successfully...!!!",
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        }
      });
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }

  updateAided() {
  if (this.Formdoc.valid) {
      this.manageAudit = this.Formdoc.value;
      this.spinner.show();
      this.manageAuditServiceService.updateManageAudit(this.manageAudit).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Record Updated Successfully",
              "bottom",
              "center"
            );
            this.onCancel();
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Updated Successfully...!!!",
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        }
      });
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }
 
  resetSelf() {
    if (!this.edit) {
      this.docForm.reset();
      this.docForm.patchValue({
        'loginedUser': this.tokenStorage.getUserId(),
        'companyId':this.tokenStorage.getCompanyId(),
        'branchId':this.tokenStorage.getBranchId(),
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }

  resetAided() {
    if (!this.edit) {
      this.Formdoc.reset();
      this.Formdoc.patchValue({
        'loginedUser': this.tokenStorage.getUserId(),
        'companyId':this.tokenStorage.getCompanyId(),
        'branchId':this.tokenStorage.getBranchId(),
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }

  onCancel() {
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


  getDateString(event, inputFlag, index) {
    let cdate = this.commonService.getDate(event.target.value);
    if (this.docForm.get('auditType').value == "Self") {
      if (inputFlag == 'startDate') {
        this.docForm.patchValue({ startDate: cdate });
      } else if (inputFlag == 'endDate') {
        this.docForm.patchValue({ endDate: cdate });
      }
    } else if (this.Formdoc.get('auditType').value == "Aided") {
      if (inputFlag == 'startDate') {
        this.Formdoc.patchValue({ startDate: cdate });
      } else if (inputFlag == 'endDate') {
        this.Formdoc.patchValue({ endDate: cdate });
      }
    }
  }

  getDateStrAided(event,inputFlag,index){
    let cdate = this.commonService.getDate(event.target.value);
    if(inputFlag=='startDate'){
      this.Formdoc.patchValue({startDate:cdate});
    }else if(inputFlag=='endDate'){
      this.Formdoc.patchValue({endDate:cdate});
    }
  }

}
