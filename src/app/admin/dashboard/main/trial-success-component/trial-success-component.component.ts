import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { MainService } from '../../main.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trial-success-component',
  templateUrl: './trial-success-component.component.html',
  styleUrls: ['./trial-success-component.component.sass']
})
export class TrialSuccessComponentComponent implements OnInit {
  requestId:any;
  username:any;
  userId:any;
  roleId:any;
  constructor( private router:Router,    public route: ActivatedRoute, 
    private httpService:HttpServiceService,private mainService:MainService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.userId!=undefined && params.userId!=0){
       this.userId = params.userId;
       this.username = params.username;
       this.roleId = params.roleId;
       this.requestId = params.userId;

      }
    });

    this.httpService.get(this.mainService.trialsuccess + "?userId=" + this.userId + "&username=" + this.username + "&roleId=" + this.roleId).subscribe((res: any) => {
      console.log(res);
     this.logout()
     },
     (err: HttpErrorResponse) => {
     }
   );
   //  this.onTransfer()
 }


//  onTransfer(): void{
//    this.httpService.get(this.mainService.trialsuccess + "?userId=" + this.userId + "&username=" + this.username + "?roleId=" + this.roleId).subscribe((res: any) => {
//       console.log(res);
//    // this.logout()
//      },
//      (err: HttpErrorResponse) => {
//      }
//    );
//  } 
 logout(){
   this.router.navigate(['/authentication/signin']);
 }
}

