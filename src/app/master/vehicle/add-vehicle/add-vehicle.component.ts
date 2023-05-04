import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { VehicleService } from '../vehicle.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Vehicle } from '../vehicle-model';
import { HttpErrorResponse } from '@angular/common/http';
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
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.sass'],
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

export class AddVehicleComponent implements OnInit {
 
    docForm: FormGroup;
    vehicle:Vehicle;
    edit: any;
    requestId: any;
    branchList: [];
    submitted: boolean;
    
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    private VehicleService:VehicleService,
    private cmnService:CommonService,private httpservice:HttpServiceService,
    private router:Router,public route: ActivatedRoute, 
    private spinner: NgxSpinnerService,public tokenStorage: TokenStorageService,
    private notificationService: NotificationService,) {
    
   
      this.docForm = this.fb.group({
        registrationNumber:[""],
        brand:[""],
        bodyStyle:[""],
        dateOfbuying:[""],
        dateOfbuyingObj:[""],
        driveType :[""],
        rtoCode:[""],
        transmissionType:[""],
        engineType:[""],
        tin:[""],
        vehicleColour:[""], 
        insurancetype:[""],
        number:[""],
        ownership:[""],
        vin:[""],
        loginedUser:this.tokenStorage.getUserId(),
        id:[""],
      
       
  
      
  
  
      })
  


   }

   ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
    });
   }

  onSubmit():void{
    this.vehicle = this.docForm.value;

    if(this.docForm.valid){ 
      this.VehicleService.savevehicle(this.vehicle,this.router,this.notificationService);{
      }
    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
        
      }
        }
        fetchDetails(id: any) {
          const obj = {
            editId: id
          };
          this.VehicleService.editvehicle(obj).subscribe({
            next: (res) => {
              let ydate =this.cmnService.getDateObj(res.vehiclesBean.dateOfbuying)
            this.docForm.patchValue({
              
                
                    'registrationNumber': res.vehiclesBean.registrationNumber,
                     'brand': res.vehiclesBean.brand,
                     'bodyStyle':res.vehiclesBean.bodyStyle,
                     'dateOfbuying':res.vehiclesBean.dateOfbuying,
                     'dateOfbuyingObj':ydate,
                     'driveType' :res.vehiclesBean.driveType,
                     'rtoCode' : res.vehiclesBean.rtoCode,
                     'transmissionType' :res.vehiclesBean.transmissionType,
                     'engineType' :res.vehiclesBean.engineType,
                     'tin' :res.vehiclesBean.tin,
                     'vehicleColour' :res.vehiclesBean.vehicleColour,
                     'insurancetype':res.vehiclesBean.insurancetype,
                     'number' :  res.vehiclesBean.number,
                     'ownership' :res.vehiclesBean.ownership,
                     'vin' :res.vehiclesBean.vin,
                     'id':id
            });
          },
          error: (error) => {
          }
        });
        }
       
     
      
       onUpdate(){
        this.vehicle = this.docForm.value;
        if(this.docForm.valid){
          this.VehicleService.updatevehicle(this.vehicle,this.router,this.notificationService);
        } else {
          this.notificationService.showNotification(
            "snackbar-danger",
            "Please fill all the required details!",
            "top",
            "right");
        }
       }
      
    
    
       
         
         onReset(){
          if(!this.edit){
            this.docForm = this.fb.group({
              registrationNumber:[""],
              brand:[""],
              bodyStyle:[""],
              dateOfbuying:[""],
              dateOfbuyingObj:[""],
              driveType :[""],
              rtoCode:[""],
              transmissionType:[""],
              engineType:[""],
              tin:[""],
              vehicleColour:[""],
              enginenumber:[""],
              insurance:[""],
              ownership:[""],
              vin:[""]
            })
          }else {
            this.fetchDetails(this.requestId);
          }
         }

         onCancel(){
           this.router.navigate(['/master/vehicle/list-vehicle']);
         }
         

         showNotification(colorName, text, placementFrom, placementAlign) {
  
         }
       
         validateCustomer(event){
           
         }
         keyPressString(event: any){
         
       
         }
         keyPressNumeric(event: any) {
          const pattern = /[0-9]/;
          const inputChar = String.fromCharCode(event.charCode);
          if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
          }
        }
        keyPressName(event: any) {
          const pattern = /[A-Z, a-z]/;
          const inputChar = String.fromCharCode(event.charCode);
          if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
          }
        }




         onAddRow()
         {
           let dtlArray = this.docForm.controls.OrderDtl as FormArray;
           let arraylen = dtlArray.length;
           let newUsergroup: FormGroup = this.fb.group({
            driveType:[""],
            transmissionType:[""],
            engineType:[""],
            rtoCode:[""],
            depPrice:[""]
            })
            dtlArray.insert(arraylen,newUsergroup);
            
          
          }
          
          removeRowSelf(index) {
            const CustInvoiceDetailBeanArray = this.docForm.controls.OrderDtl as FormArray;
            CustInvoiceDetailBeanArray.removeAt(index);
          }
        
        getDateString(event,inputFlag,index){
          let cdate = this.commonService.getDate(event.target.value);
          if(inputFlag=='dateOfbuying'){
            this.docForm.patchValue({dateOfbuying:cdate});
          }
        }
          
}
