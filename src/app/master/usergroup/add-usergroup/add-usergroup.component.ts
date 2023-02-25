import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { UserGroupMaster } from '../usergroup-model';
import { UsergroupService } from '../usergroup.service';

@Component({
  selector: 'app-add-usergroup',
  templateUrl: './add-usergroup.component.html',
  styleUrls: ['./add-usergroup.component.sass']
})
export class AddUsergroupComponent implements OnInit {

  docForm: FormGroup;
  requestId: any;
  userGroup:any;

 
  constructor(private fb: FormBuilder,
    public router:Router,
    private snackBar: MatSnackBar,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private serverUrl:serverLocations,
    private usergroupService : UsergroupService
    ) { 

    this.docForm = this.fb.group({
      userName:[""],
      userRole:[""],
    });

  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = parseInt(params.id);
        this.fetchDetails(this.requestId);
      }
    });



      }

      fetchDetails(companyId: any): void {
        this.httpService.get(this.usergroupService.editUserMaster + "?companyId="+companyId).subscribe((res: any) => {    
          this.userGroup = res.userGroupList;
        },
          (err: HttpErrorResponse) => {
          }
        );
       
      }

      onCancel(){
        this.router.navigate(['/master/usergroup/listusergroup']);
      }
      

    


}

