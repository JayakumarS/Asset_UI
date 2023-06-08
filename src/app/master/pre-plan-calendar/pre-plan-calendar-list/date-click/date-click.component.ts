import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
// import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
// import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
// import { DeliveryNoteResultBean } from 'src/app/inventory/delivery-note/delivery-note-result-bean';
// import { DeliveryNoteService } from 'src/app/inventory/delivery-note/delivery-note.service';
import { SalesOrderResultBean } from 'src/app/marketing/sales-order/sales-order-result-bean';
import { SalesOrderService } from 'src/app/marketing/sales-order/sales-order.service';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';
import { PrePlanCalendarService } from '../../pre-plan-calendar.service';
import { PrePlanCalendar } from '../../pre-plan-calendar.model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
// import { GrnService } from 'src/app/purchase/grn/grn.service';

@Component({
  selector: 'app-date-click',
  templateUrl: './date-click.component.html',
  styleUrls: ['./date-click.component.sass']
})
export class DateClickComponent implements OnInit {

  docForm: FormGroup;
  prePlanCalendar:PrePlanCalendar;
  currencyList:[];
  editValue:{
    startStr:'',
    endStr:'',
    title:''
  }
  edit:boolean=false;
  editable:boolean=false;
  // oldPwd: boolean=false;

  // For Encryption
  requestId: any;
  decryptRequestId: any;
  dateValue: any;
  newId: any;
  customerList=[];
  locationList=[];
 

  constructor(private fb: FormBuilder,
    public router:Router,
    private notificationService: NotificationService,
    private prePlanCalendarService: PrePlanCalendarService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    public tokenStorage: TokenStorageService,
    // public EncrDecr: EncrDecrService,
    private serverUrl:serverLocations,
    // private deliveryNoteService : DeliveryNoteService,
    public salesOrderService:SalesOrderService,
    // private encryptionService:EncryptionService,
    public dialogRef: MatDialogRef<DateClickComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public start: any,
    @Inject(MAT_DIALOG_DATA) public end: any,
    @Inject(MAT_DIALOG_DATA) public allDay: any,
    @Inject(MAT_DIALOG_DATA) public eventId: any,
    @Inject(MAT_DIALOG_DATA) public startEdit: any,
    @Inject(MAT_DIALOG_DATA) public endEdit: any,
    @Inject(MAT_DIALOG_DATA) public title: any,
    @Inject(MAT_DIALOG_DATA) public isEdit: any) { 
      this.docForm = this.fb.group({
        // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
        userName:["",[Validators.required]],
        dtype:["", [Validators.required]],
        damount:[""],
        dpay:[""],
        dbankname:[""],
        remarks:[""],
        

        startStr:[""],
        endStr:[""],
        allDay:[""],
        eventId:[""],

        loginedUser: this.tokenStorage.getUserId(),
      });
    }

  ngOnInit(): void {
    // this.fetchDetails(this.eventId)
    // this.route.params.subscribe(params => {
    //   if(params.id!=undefined && params.id!=0){
    //    this.requestId = params.id;
    //    this.edit=true;
    //    //For User login Editable mode
    //   //  this.fetchDetails(this.allDay.title) ;
    //   }
    //  });

    //      this.route.params.subscribe(params => {
    //   if(params.id!=undefined && params.id!=0){ this.decryptRequestId = params.id;
    //   this.requestId = this.EncrDecr.get(this.serverUrl.secretKey, this.decryptRequestId)
    //    this.edit=true;
    //    //For User login Editable mode
    //    this.fetchDetails(this.requestId) ;

    //   }
    //  });

 // customer dropdown 
//  this.httpService.get<SalesOrderResultBean>(this.salesOrderService.customerList).subscribe(
//   (data) => {
//     console.log(data);
//     this.customerList = data.customerList;
//   },
//   (error: HttpErrorResponse) => {
//     console.log(error.name + " " + error.message);
//   }
// );

//location List
// this.httpService.get<DeliveryNoteResultBean>(this.deliveryNoteService.locationList).subscribe(
//   (data) => {
//     this.locationList = data.locationList;
//   },
//   (error: HttpErrorResponse) => {
//     console.log(error.name + " " + error.message);
//   }
// );

    if(this.isEdit.isEdit==true){
      this.editable=true;
      this.httpService.get<any>(this.prePlanCalendarService.editEventDetail+ "?startStr=" +this.startEdit.startEdit+"&endStr="+this.endEdit.endEdit+"&title="+this.title.title).subscribe((res: any) => {
      this.docForm.patchValue({
        'userName':res.prePlan.userName,
          'dtype':res.prePlan.dtype,
          'damount':res.prePlan.damount,
          'dpay':res.prePlan.dpay,
          'dbankname':res.prePlan.dbankname,
          'remarks':res.prePlan.remarks,
        'eventId':res.prePlan.eventId
      });
      });
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit(){

    if(this.docForm.valid){
      this.newId=this.eventId.eventId+1;
      this.docForm.patchValue({
        'startStr': this.start.start,
        'endStr': this.end.end,
        'allDay': this.allDay.allDay,
        'eventId': this.newId
      })
       this.prePlanCalendar = this.docForm.value;

       console.log(this.prePlanCalendar);
       this.prePlanCalendarService.addPreplan(this.prePlanCalendar,this.router,this.notificationService);
      //  this.countryMasterService.addPrePlan(this.dateValue,this.router,this.notificationService);
       this.dialogRef.close();
       this.showNotification(
        "snackbar-success",
        "Added Record Successfully...!!!",
        "bottom",
        "center"
      );
       window.location.reload();
      //  window.sessionStorage.setItem("Open", "true");
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }

  // fetchDetails(requestId: any): void {
  //   const obj = {
  //     editId: requestId
  //   }
  //   this.prePlanCalendarService.editlist(obj).subscribe({
  //     next: (res) => {
        
  //     this.docForm.patchValue({
  //         'userName':res.userName,
  //         'dtype':res.dtype,
  //         'damount':res.damount,
  //         'dpay':res.dpay,
  //         'dbankname':res.dbankname,
  //         'remarks':res.remarks,
          
  //     });
  //   },
  //   error: (error) => {
  //   }
  //   });
  //   }

  
  // fetchDetails(countryCode: any): void {
    // this.httpService.get(this.countryMasterService.editCountryMaster + "?countryMaster="+encodeURIComponent(this.encryptionService.encryptAesToString(countryCode, this.serverUrl.secretKey).toString())).subscribe((res: any) => {
    //   console.log(countryCode);

    //   this.docForm.patchValue({
    //     'countryCode': res.countryMasterBean.countryCode,
    //     'countryName': res.countryMasterBean.countryName,
    //     'currency': res.countryMasterBean.currency,
    //     'clientType': res.countryMasterBean.clientType,
    //     'isActive': res.countryMasterBean.isActive,
    //   })
    // },
    //   (err: HttpErrorResponse) => {
    //     // error code here
    //   }
    // );
  // }
  
  update() {

    if(this.docForm.valid){
      
       this.prePlanCalendar = this.docForm.value;
       console.log(this.prePlanCalendar);
       this.prePlanCalendarService.updateprePlan(this.prePlanCalendar,this.router,this.notificationService);
      //  this.countryMasterService.updatePreplan(this.dateValue,this.router,this.notificationService);
       this.dialogRef.close();
       this.showNotification(
        "snackbar-success",
        "Updated Successfully...!!!",
        "bottom",
        "center"
      );
      window.location.reload()
       this.router.navigate(['/master/prePlanCalendar/prePlanCalendar-list']);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );
    }
  }

  delete(){
     if (confirm(`Are you sure you want to delete the event`)) {
       //clickInfo.event.remove();
       this.prePlanCalendar = this.docForm.value;
       console.log(this.prePlanCalendar);
       this.prePlanCalendarService.deleteEvent(this.prePlanCalendar,this.router,this.notificationService);
      //  this.countryMasterService.deleteEvent(this.dateValue,this.router,this.notificationService);
       this.dialogRef.close();
       //this.router.navigate(['/crm/prePlanCalendar/prePlanCalendarList']);
      //  let currentUrl = this.router.url;
      //  this.router.navigate([currentUrl]);
      this.showNotification(
        "snackbar-success",
        "Deleted Record Successfully...!!!",
        "bottom",
        "center"
      );
       window.location.reload();
     }
  }

  onCancel(){
    window.sessionStorage.setItem("Open", "true");
    this.dialogRef.close();
  }
  
  reset(){
      this.docForm = this.fb.group({
        userName:[""],
        dtype:[""],
        damount:[""],
        dpay:[""],
        dbankname:[""],
        remarks:[""],
        loginedUser: this.tokenStorage.getUserId(),

      });
  }
  // reset(){

  //   this.docForm = this.fb.group({
  //     


  //     customer: ["", [Validators.required]],
  //     activity: [""],
  //     location: [""],
  //     mode:[""],
  //     assignedBy:[""],
  //     
  //   });

    
  

  validateCountry(event){
    // this.httpService.get<any>(this.countryMasterService.validateCusShortNameUrl+ "?tableName=" +"country"+"&columnName="+"country_code"+"&columnValue="+event).subscribe((res: any) => {
    //   if(res){
    //     this.docForm.controls['countryCode'].setErrors({ country: true });
    //   }else{
    //     this.docForm.controls['countryCode'].setErrors(null);
    //   }
    // });
  }

  keyPressName(event: any) {
    const pattern = /[A-Z, a-z]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressNumberDouble(event: any) {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}






  

