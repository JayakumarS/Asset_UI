import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {  MomentDateAdapter } from '@angular/material-moment-adapter';
import { serverLocations } from 'src/app/auth/serverLocations';
import { NotificationService } from 'src/app/core/service/notification.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assetserver } from '../server.model';
import { ServerService } from '../server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServerResultBean } from '../server-result-bean';
import { NgxSpinnerService } from 'ngx-spinner';
import * as internal from 'stream';
import * as moment from 'moment';
import axios from 'axios';
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
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.sass'],
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
export class AddServerComponent implements OnInit {
  removedIds:any=[];
  docForm: FormGroup;
  edit:boolean=false;
  assetServer: Assetserver;
  requestId: any;
  editflag:boolean=false;
  serverDdList=[];
  assettypelist=[];
  depreciationlist=[];
  ServerId: any;
  proofDtl: any;

  constructor(private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private serverService: ServerService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private serverUrl: serverLocations,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService, 
    private spinner: NgxSpinnerService,
    private commonService: CommonService,private cmnService: CommonService,
    private router:Router
  ) {
    this.docForm = this.fb.group({
      removeId: [""],
      serverId: [""],
      customer:["",[Validators.required]],
      publicIp:["", [Validators.pattern(
      /^((25[0-5]|(2[0-4][0-9])|(1[0-9][0-9])|([1-9]?[0-9]))\.){3}(25[0-5]|(2[0-4][0-9])|(1[0-9][0-9])|([1-9]?[0-9]))$/
      )]],
      privateIp:["", [Validators.required,Validators.pattern(
      /^((25[0-5]|(2[0-4][0-9])|(1[0-9][0-9])|([1-9]?[0-9]))\.){3}(25[0-5]|(2[0-4][0-9])|(1[0-9][0-9])|([1-9]?[0-9]))$/
      )]],
      osType:["",[Validators.required]],
      serverName:["",[Validators.required]],
      core:[""],
      ram:[""],
      hdd:[""],
      ports:[""],
      location:["",[Validators.required]],
      applications:[""],
      dbName:[""],
      dbPwd:[""],
      dbPort:[""],
      dumpLocation:[""],
      crontabConfig:[""],
      backupLocation:[""],
      url:[""],
      loginName:[""],
      loginPwd:[""],
      serverPerformance:["",[Validators.required]],
      proofDtl: this.fb.array([
        this.fb.group({
          serverListId:[""],
          username:["",[Validators.required]],
          usernamePwd:["",[Validators.required]],
          isAdmin:[false],
        })
      ])
    });
   }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
        this.requestId = params.id;
        this.edit=true;
        // For User login Editable mode
        this.fetchDetails(this.requestId);
        this.ServerId = this.requestId;
      }
    });
     // Parent Server dropdown
     this.httpService.get<any>(this.commonService.getAssetServerDropdown+"?companyId="+this.tokenStorage.getCompanyId()).subscribe({
      next: (data) => {
        this.serverDdList = data;
      },
      error: (error) => {

      }
    }
    );



    if(this.docForm.value.userCode==''||this.docForm.value.userCode==null){
      this.editflag=true
    }else{
      this.editflag=false;
    }
  }



  // removeRowSelf(index){
  //   let dtlArray = this.docForm.controls.proofDtl as FormArray;
  //   dtlArray.removeAt(index);
  // }

  removeRowSelf(data: any,index) {

    this.removedIds.push(data.value.serverListId);
      let dtlArray = this.docForm.controls.proofDtl as FormArray;
    dtlArray.removeAt(index);
  
}

  onAddRow(){
    let dtlArray = this.docForm.controls.proofDtl as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      username:["",[Validators.required]],
      usernamePwd:["",[Validators.required]],
      isAdmin:[false]
  
    })
    dtlArray.insert(arraylen, newUsergroup);

  }

  reset(){
    if (!this.edit){
      this.docForm = this.fb.group({
        customer:[""],
        publicIp:[""],
        privateIp:[""],
        osType:[""],
        serverName:[""],
        core:[""],
        ram:[""],
        hdd:[""],
        ports:[""],
        location:[""],
        applications:[""],
        dbName:[""],
        dbPwd:[""],
        dbPort:[""],
        dumpLocation:[""],
        crontabConfig:[""],
        backupLocation:[""],
        url:[""],
        loginName:[""],
        loginPwd:[""],
        serverPerformance:[""],
        proofDtl: this.fb.array([
          this.fb.group({
            username:["",[Validators.required]],
            usernamePwd:["",[Validators.required]],
            isAdmin:[false],
          })
        ])
      })
    }else {
      this.fetchDetails(this.requestId);
    }
  }

  onSubmit():void{
    this.assetServer = this.docForm.value;
    console.log(this.assetServer);
    if(this.docForm.valid){
      console.log("Form Submitted:", this.docForm.value);
      this.snackBar.open('Form submitted successfully!', 'Close', { duration: 3000 });
      this.assetServer = this.docForm.value;
      console.log(this.assetServer);
      this.serverService.addserver(this.assetServer,this.router,this.notificationService);
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }

  }

  update(){

    this.docForm.patchValue({
      'removeId': this.removedIds.join(',')
  });

    this.docForm.patchValue({
      'serverId': this.ServerId,
    })

    if(this.docForm.valid){
      this.assetServer = this.docForm.value;
      this.serverService.serverUpdate(this.assetServer,this.router,this.notificationService);
    }else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }

  onCancel(){
    this.router.navigate(['/master/server/list-server']);
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }



  fetchDetails(server_id: any){
    this.requestId = server_id;
  this.httpService.get(this.serverService.editserver + "?server_id=" + server_id).subscribe((res: any) => {

    console.log(server_id);
    // if(res.assetServerBean.userCode==''||res.assetServerBean.userCode==null){
    //   this.editflag=true
    // }else{
    //   this.editflag=false;
    // }

    this.docForm.patchValue({
     
      'customer': res.serverBean.customer,
      'publicIp': res.serverBean.publicIp,
      'privateIp': res.serverBean.privateIp,
      'osType': res.serverBean.osType,
      'serverName': res.serverBean.serverName,
      'core': res.serverBean.core,
      'ram': res.serverBean.ram,
      'hdd': res.serverBean.hdd,
      'ports': res.serverBean.ports,
      'location': res.serverBean.location,
      'applications': res.serverBean.applications,
      'dbName': res.serverBean.dbName,
      'dbPwd': res.serverBean.dbPwd,
      'dbPort': res.serverBean.dbPort,
      'dumpLocation': res.serverBean.dumpLocation,
      'crontabConfig': res.serverBean.crontabConfig,
      'backupLocation': res.serverBean.backupLocation,
      'url': res.serverBean.url,
      'loginName': res.serverBean.loginName,
      'loginPwd': res.serverBean.loginPwd,
      'serverPerformance' : res.serverBean.serverPerformance,
      'proofDtl': res.serverBean.proofDtl,      

   })


   if (res.serverBeanList != null && res.serverBeanList.length > 0) {
    let dtlArray = this.docForm.controls.proofDtl as FormArray;
    dtlArray.clear();
    res.serverBeanList.forEach(element => {
      let dtlArray = this.docForm.controls.proofDtl as FormArray;
      let arraylen = dtlArray.length;
      let newUsergroup: FormGroup = this.fb.group({
        serverListId: [element.serverListId],
        username: [element.username],
        usernamePwd: [element.usernamePwd],
        isAdmin: [element.isAdmin]
      })
      dtlArray.insert(arraylen, newUsergroup);
    });
  }

    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
  }

}
