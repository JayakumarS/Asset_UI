import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

import { Itsupportservice } from '../it-support.service';

@Component({
  selector: 'app-view-it-support',
  templateUrl: './view-it-support.component.html',
  styleUrls: ['./view-it-support.component.sass']
})
export class ViewItSupportComponent implements OnInit {
  [x: string]: any;
  roleId: any;
  requestId: any;
  docForm: FormGroup;
  branchList: any;
  loginedUser: any;

  constructor(
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private httpService: HttpServiceService,
    public itsupportservice: Itsupportservice,
    public tokenStorage: TokenStorageService,
  ) {

  }
    ngOnInit(): void {
      this.roleId=this.tokenStorage.getRoleId();
      this.route.params.subscribe(params => {
        if(params.id!=undefined && params.id!=0){
         this.requestId = params.id;
         this.view(this.requestId) ;
        }
       });
      }

// view

  view(id:any){
    this.httpService.get<any>(this.itsupportservice. viewItSupport+"?id="+id).subscribe({
    next: (data) => {
      this.branchList = data.itSupportBean;
      
    },
    error: (error) => {
    }
  });
}

 back(){
        this.router.navigate(['/helpdesk/itsupport/listitsupport']);
      }

    }


