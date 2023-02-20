import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CityMaster } from '../city-model';
import { CityService } from '../city.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.sass']
})
export class AddCityComponent implements OnInit {

  docForm: FormGroup;
  stateList:[];
  edit:boolean=false;
  cityMaster:CityMaster
  spinner: any;
  requestId: number;

  constructor(private fb: FormBuilder,
    private cityService : CityService,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,private tokenStorage: TokenStorageService,
    private notificationService: NotificationService) {

      this.docForm = this.fb.group({
        cityName:[""],
        stateId:[""],
        isactive:[true],
        loginedUser: this.tokenStorage.getUserId(),

      });
     }

     ngOnInit(): void {

      this.httpService.get<any>(this.commonService.getStateDropdown).subscribe({
        next: (data) => {
          this.stateList = data;
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
      this.cityMaster = this.docForm.value;
      console.log(this.cityMaster);
  
      this.cityService.addCompany(this.cityMaster,this.router);
  
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
      this.cityService.editState(obj).subscribe({
        next: (res: any) => {
          this.docForm.patchValue({
            'city_id':res.cityBean.city_id,
            'cityName': res.cityBean.cityName,
            'stateId': res.cityBean.stateId,
            'isactive': res.cityBean.isactive,
          })
        },
        error: (error) => {
          this.spinner.hide();
          // error code here
        }
      });
  }
    
    update(){
      if (this.docForm.valid) {
        this.cityMaster = this.docForm.value;
        this.cityMaster.city_id= this.requestId;
        this.cityService.updateState(this.cityMaster).subscribe({
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
          "Please fill all the required details!",
          "top",
          "right"
        );
      }
    
  
    }
    reset(){
      if (!this.edit) {
        this.docForm.reset();
        this.docForm.patchValue({
          cityName:[""],
          stateId:[""],
          isactive:[],
        })
      } else {
        this.fetchDetails(this.requestId);
      }
    }
    onCancel(){
      this.router.navigate(['/master/cityMaster/listCity/'])
  
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
      this.httpService.get<any>(this.cityService.uniqueValidateUrl+ "?tableName=" +"city"+"&columnName="+"city_name"+"&columnValue="+event).subscribe((res: any) => {
        if(res){
          this.docForm.controls['cityName'].setErrors({ city: true });
        }else{
          this.docForm.controls['cityName'].setErrors(null);
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







