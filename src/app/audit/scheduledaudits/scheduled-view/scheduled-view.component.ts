import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ScheduledauditsService } from '../scheduledaudits.service';

@Component({
  selector: 'app-scheduled-view',
  templateUrl: './scheduled-view.component.html',
  styleUrls: ['./scheduled-view.component.sass']
})
export class ScheduledViewComponent implements OnInit {
  roleId: any;
  requestId:any;
  auditDetails:any;
  scheduledAuditDetailsList:any;

  constructor(
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public scheduledauditsService: ScheduledauditsService,
    public dialog: MatDialog,
    public tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService) {
     }

  ngOnInit(): void {
    this.roleId=this.tokenStorage.getRoleId();
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.fetchDetails(this.requestId) ;
      }
     });
  }

  fetchDetails(id: any): void {
    const obj = {
      editId: id,
      companyId: this.tokenStorage.getCompanyId(),
      roleId: this.tokenStorage.getRoleId()
    }
    this.spinner.show();
    this.scheduledauditsService.editAudit(obj).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        if(res != null){
          this.auditDetails=res?.scheduleAudit;
          if (res?.scheduleAuditDetailList != null && res?.scheduleAuditDetailList.length >= 1) {
            this.scheduledAuditDetailsList=res?.scheduleAuditDetailList;
          }
        }
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
   }


    back(){
      if (this.router.url.includes('/audit/scheduledaudits/scheduled-view')) {
        this.router.navigate(['/audit/scheduledaudits/list-scheduledaudits/']);
      } else if (this.router.url.includes('/audit/manageaudit/manageAudit-view')) {
        this.router.navigate(['audit/manageaudit/listManageAudit']);
      }
    }
 

}
