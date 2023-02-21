import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { StateMaster } from '../state-model';
import { StateServiceService } from '../state-service.service';

@Component({
  selector: 'app-add-state-master',
  templateUrl: './add-state-master.component.html',
  styleUrls: ['./add-state-master.component.sass']
})
export class AddStateMasterComponent implements OnInit {
  docForm:FormGroup;
  countryList:[];
  edit:boolean=false;
  stateMaster:StateMaster;
  requestId: number;
  spinner: any;
  state_id:number;
  state: string;




  constructor(private fb: FormBuilder,
    private stateService : StateServiceService,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,private tokenStorage: TokenStorageService,
    private notificationService: NotificationService) {

      this.docForm = this.fb.group({
        stateName:["", [Validators.required]],
        stateCode:["", [Validators.required]],
        country:[""],
        isactive:[true],
        loginedUser: this.tokenStorage.getUserId(),

      });
     }

  ngOnInit(): void {

    this.httpService.get<any>(this.commonService.getCountryDropdown).subscribe({
      next: (data) => {
        this.countryList = data;
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
    if(this.docForm.valid){
      this.docForm.value.userId = this.tokenStorage.getUserId();
    this.stateMaster = this.docForm.value;
    console.log(this.stateMaster);

    this.stateService.addCompany(this.stateMaster,this.router);

      this.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "bottom",
        "center"
      );
      this.onCancel();

    }else{
      this.showNotification(
        "snackbar-danger",
        "Not Added!!!",
        "bottom",
        "center"
      );
    }

  }
  fetchDetails(id:any){
    const obj = {
      editId: id
    }
    this.stateService.editState(obj).subscribe({
      next: (res: any) => {
        this.docForm.patchValue({
          'state_id': res.stateBean.state_id,
          'stateName': res.stateBean.stateName,
          'stateCode': res.stateBean.stateCode,
          'country': res.stateBean.country,
          'isactive' : res.stateBean.isactive,
        })
      },
      error: (error) => {
        this.spinner.hide();
        // error code here
      }
    });
}

  update(){
    if(this.docForm.valid){

      this.stateMaster = this.docForm.value;
      this.stateMaster.state_id = this.requestId;
      this.stateService.updateState(this.stateMaster).subscribe({
        next: (data) => {
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
        "Not Added!!!",
        "bottom",
        "center"
      );
    }

  }

  reset(){
    if (!this.edit) {
      this.docForm = this.fb.group({
        stateName:[""],
        stateCode:[""],
        country:[""],
        isactive:[""],
      })
    } else {
      this.fetchDetails(this.requestId);
    }
  }
  onCancel(){
    this.router.navigate(['/master/stateMaster/listStateMaster'])
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  validateCustomer(event){
    this.httpService.get<any>(this.stateService.uniqueValidateUrl+ "?tableName=" +"state"+"&columnName="+"state_code"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['stateCode'].setErrors({ state: true });
      }else{
        this.docForm.controls['stateCode'].setErrors(null);
      }
    });
  }
  keyPressString(event: any){
    const pattern = /[A-Z,a-z ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
