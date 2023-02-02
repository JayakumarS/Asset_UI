import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { CommonService } from 'src/app/common-service/common.service';
import { ScheduledAudit } from '../scheduledaudits-model';
import { ScheduledauditsService } from '../scheduledaudits.service';

@Component({
  selector: 'app-scheduled-view',
  templateUrl: './scheduled-view.component.html',
  styleUrls: ['./scheduled-view.component.sass']
})
export class ScheduledViewComponent implements OnInit {

  profileViewDetails:any
  docForm: FormGroup;
  requestId:any;
  auditCode: any;
  scheduledAudit: ScheduledAudit | null;
  financialChangeDetails:[];


  constructor(private fb: FormBuilder,
    private commonService: CommonService, private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public scheduledauditsService: ScheduledauditsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private serverUrl: serverLocations,    ) {

      this.docForm = this.fb.group({
        auditName:[""],
        auditCode:["",[Validators.required]],
        startDateObj:[""],
        companyName:["",[Validators.required]],
        auditorName:[""],
        startDate:[""],
        assetName:[""],
        location:[""],
        Quantity:[""],
        remarks:[""],
     
          })
    
  
     }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
    
       this.viewprofile(this.requestId) ;
    
      }
     });

    }

    viewprofile(id: any){
      
       // this.httpService.get(this.scheduledauditsService.edit+"?id="+id).subscribe((res: any)=> {
          this.httpService.get(this.scheduledauditsService.editAudit+"?auditCode="+id).subscribe({
        next: (res: any) => {
          
     this.profileViewDetails=res.scheduleauditbean;
     this.financialChangeDetails=res.details;
  
     console.log(this.profileViewDetails);
       
      },
      error: (error) => {
      
       // error code here
     }
      

     
    });
    
    }

    exitCall(){
      this.router.navigate(['/audit/scheduledaudits/list-scheduledaudits/']);
    }


  accurredDepreciationPopUp(row) {

    console.log(row.tab.textLabel);
  }
 

}
