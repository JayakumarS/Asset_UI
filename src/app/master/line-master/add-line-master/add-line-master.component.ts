import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { BranchService } from '../../branch/branch.service';
import { Line } from '../line-master.model';
import { LineMasterService } from '../line-master.service';

@Component({
  selector: 'app-add-line-master',
  templateUrl: './add-line-master.component.html',
  styleUrls: ['./add-line-master.component.sass']
})
export class AddLineMasterComponent implements OnInit {

  lineMaster:Line;
  requestId: number;
  docForm: FormGroup;
  branchList = [];
  edit:boolean=false;
  userId:any;
  companyId: any;
  constructor(private fb: FormBuilder,
    private branchService : BranchService,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,private tokenStorage: TokenStorageService,
    private notificationService: NotificationService, private lineMasterService: LineMasterService) {
      this.docForm = this.fb.group({
        branch: ["", [Validators.required]],
        lineCode: ["", [Validators.required]],
        lineDescription:[""],
        companyId:this.tokenStorage.getCompanyId(),
        isactive:[true],
        loginedUser: this.tokenStorage.getUserId(),
        id:[""]
      });


     }

  ngOnInit(): void {

    this.companyId=this.tokenStorage.getCompanyId();
    this.httpService.get<any>(this.commonService.getBranchByCompany+"?companyId="+this.companyId).subscribe({
      next: (data) => {
        this.branchList = data.addressBean;
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

  fetchDetails(requestId: any): void {
    const obj = {
      editId: requestId
    }
    this.lineMasterService.editLine(obj).subscribe({
      next: (res) => {
      this.docForm.patchValue({
          'branch': res.branch,
          'lineCode': res.lineCode,
          'lineDescription': res.lineDescription,
          'isactive' :res.isactive,
          'id' :this.requestId
      });
    },
    error: (error) => {
    }
  });
  }

  onSubmit(){
    this.lineMaster = this.docForm.value;

    if(this.docForm.valid){ 
      this.lineMasterService.addLine(this.lineMaster,this.router,this.notificationService);
    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  }

  update(){
    this.lineMaster = this.docForm.value;
    if(this.docForm.valid){
      this.lineMasterService.updateLine(this.lineMaster,this.router,this.notificationService);
    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  }

  reset(){
    if (!this.edit) {
      location.reload();
      this.docForm = this.fb.group({
        branch: ["", [Validators.required]],
        lineCode: ["", [Validators.required]],
        lineDescription:[""],
        companyId:this.tokenStorage.getCompanyId(),
        isactive:[true],
        loginedUser: this.tokenStorage.getUserId(),
        id:[""]
      });
  } else {
    this.fetchDetails(this.requestId);
  }
  }

  onCancel(){
    this.router.navigate(['/master/line/listLine']);
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
