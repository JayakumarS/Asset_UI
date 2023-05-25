import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { VehicleService } from '../vehicle.service';
import {  VehicleMaster } from '../vehicle-model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {  MomentDateAdapter } from '@angular/material-moment-adapter';
import { serverLocations } from 'src/app/auth/serverLocations';
import { NotificationService } from 'src/app/core/service/notification.service';



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
  requestId: number;
  editflag:boolean=false;
  vehicleMaster : VehicleMaster;
  edit: boolean = false;
  private  acceptFileTypes = ["application/pdf", "application/docx", "application/doc", "image/jpg", "image/png", "image/jpeg"]
  filePathUrl: string;
  uploadFile: boolean = false;
  isCash: boolean = true;
  isEmi: boolean = true;
  isYes: boolean = true;
  isNo: boolean = true;
  isYes1: boolean = true;
  isNo1: boolean = true;
  istwowheeler: boolean = false;
  isfourwheeler: boolean = false;
  textBox:boolean = false;
  isAutoDebit: boolean;
  isLoan: boolean;
  

  constructor(private fb: FormBuilder,
  
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private serverUrl: serverLocations,
    private tokenStorage: TokenStorageService,
    private vehicleService : VehicleService,
    private notificationService: NotificationService, 
    private commonService: CommonService,private cmnService: CommonService,
    private router:Router) {

    this.docForm = this.fb.group({
      vehiclename: [""],
      vehicletype: [""],
      vehiclebrand :["",[Validators.required]],
      regno:["", [Validators.required]],
      chassisno:["", [Validators.required]],
      engineno:["", [Validators.required]],
      bodytype:["", [Validators.required]],
      fueltype:[""],
      ownertype:["",[Validators.required]],
      dateofpurc:["", [Validators.required]],
      insurancedetails:["", Validators.pattern('^[A-Z]{2}[0-9]{6}[A-Z]$')],
      service:["", [Validators.required]],
      discardFromDate:[""],
      discardFromDate1:[""],
      vehiclewheel:["", [Validators.required]],
      colour:[""],
      age:[""],
      rtocode:[""],
      purcamount:[""],
      insurancetype: ["", [Validators.required]],
      insuredamount: ["", [Validators.required]],
      payment: ["cash"],
      insurername: [""],
      validity: ["", [Validators.required]],
      validity1:[""],
      address: [""],
      yom: [""],
      license : ["yes"],
      lin: [""],
      agency: [""],
      emiamount: [""],
      seater: [""],
      purpose: [""],
      bodytype1: [""],
      others: [""],
      drivetype: [""],
      parivahan: ["yes1"],
      autoDebit: [""],
      bankName: [""],
      branchName: [""],
      ifscCode: [""],
      acName: [""],
      acNumber: [""],
      loanAmount: [""],
      loanNo: [""],
      emiDate:[""],
      emiDateObj: [""],
      loanInterest: [""],
      uid: [""],
      password: [""],
      loanVehicle: ["", [Validators.required]],

    });

  }

  ngOnInit(): void {

    this.docForm = this.fb.group({
      vehiclename: [""],
      vehicletype: [""],
      vehiclebrand :["",[Validators.required]],
      regno:["", [Validators.required]],
      chassisno:["", [Validators.required]],
      engineno:["", [Validators.required]],
      bodytype:["", [Validators.required]],
      fueltype:[""],
      ownertype:["",[Validators.required]],
      dateofpurc:["", [Validators.required]],
      insurancedetails:["", Validators.pattern('^[A-Z]{2}[0-9]{6}[A-Z]$')],
      service:["", [Validators.required]],
      discardFromDate:[""],
      discardFromDate1:[""],
      vehiclewheel:["", [Validators.required]],
      colour:[""],
      age:["", [Validators.required]],
      rtocode:[""],
      purcamount:[""],
      insurancetype: ["", [Validators.required]],
      insuredamount: ["", [Validators.required]],
      payment: ["cash"],
      insurername: [""],
      validity: ["", [Validators.required]],
      address: [""],
      yom: [""],
      license : ["yes"],
      lin: [""],
      agency: [""],
      emiamount: [""],
      loginedUser: this.tokenStorage.getUserId(),
      id:[""],
      validity1: [""],
      seater: [""],
      purpose: ["", [Validators.required]],
      bodytype1: ["" ,[Validators.required]],
      others: ["", [Validators.required]],
      drivetype: [""],
      uid: [""],
      password: [""],
      parivahan: ["yes1"],
      autoDebit: [""],
      bankName: [""],
      branchName: [""],
      ifscCode: [""],
      acName: [""],
      acNumber: [""],
      loanAmount: [""],
      loanNo: [""],
      emiDate:[""],
      emiDateObj: [""],
      loanInterest: [""],
      loanVehicle: ["", [Validators.required]],






    });
      this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
 }
     });

     this.getcash(this.docForm.value.payment);
    //  this.getlicense(this.docForm.value.license);

  }

  onSubmit(){
    this.vehicleMaster = this.docForm.value;

    if(this.docForm.valid){ 
      this.vehicleService.savevehicle(this.vehicleMaster,this.router,this.notificationService);{
      }
    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
        
      }
  }

  viewDocuments(filePath: any, fileName: any) {
    var a = document.createElement("a");
          a.href = this.serverUrl.apiServerAddress+"asset_upload/"+filePath;
          a.target = '_blank';
          a.download = fileName;
          a.click();
  }

  // Edit
  fetchDetails(id: any){
    const obj = {
      editId: id
    };
    this.edit = true;
    this.vehicleService.editvehicle(obj).subscribe({
      next: (res) => {
        this.getlicense(res.vehiclesBean.license);
        this.getpari(res.vehiclesBean.parivahan);
        this.loanFlag(res.vehiclesBean.loanVehicle);

        let hdate = this.cmnService.getDateObj(res.vehiclesBean.discardFromDate1);
        let rdate = this.cmnService.getDateObj(res.vehiclesBean.discardFromDate);
        let gdate = this.cmnService.getDateObj(res.vehiclesBean.validity1);
        let odate = this.cmnService.getDateObj(res.vehiclesBean.emiDate);



        if(res.vehiclesBean.purcamount!=null){
          var paymentValue = 'cash'
        }
        if(res.vehiclesBean.emiamount!=null){
          var paymentValue = 'emi'
        }
        this.getcash(paymentValue);

      this.docForm.patchValue({
           
        'vehiclewheel':res.vehiclesBean.vehiclewheel,
        'vehicletype':res.vehiclesBean.vehicletype,
        'vehiclebrand':res.vehiclesBean.vehiclebrand,
        'vehiclename':res.vehiclesBean.vehiclename,
        'regno':res.vehiclesBean.regno,
        'chassisno':res.vehiclesBean.chassisno,
        'engineno':res.vehiclesBean.engineno,
        'bodytype':res.vehiclesBean.bodytype,
        'colour':res.vehiclesBean.colour,
        'age':res.vehiclesBean.age,
        'rtocode':res.vehiclesBean.rtocode,
        'fueltype':res.vehiclesBean.fueltype,
        'ownertype':res.vehiclesBean.ownertype,
        'dateofpurc':hdate,
        'service':rdate,
        'discardFromDate':res.vehiclesBean.discardFromDate,
        'discardFromDate1':res.vehiclesBean.discardFromDate1,
        'yom':res.vehiclesBean.yom,
        'license':res.vehiclesBean.license,
        'lin':res.vehiclesBean.lin,
        'payment':paymentValue,
        'purcamount':res.vehiclesBean.purcamount,
        'emiamount':res.vehiclesBean.emiamount,
        'agency':res.vehiclesBean.agency,
        'insurername':res.vehiclesBean.insurername,
        'insurancetype':res.vehiclesBean.insurancetype,
        'insurancedetails':res.vehiclesBean.insurancedetails,
        'validity':gdate,
        'validity1':res.vehiclesBean.validity1,
        'insuredamount':res.vehiclesBean.insuredamount,
        'address':res.vehiclesBean.address,
        'id':this.requestId,
        'seater': res.vehiclesBean.seater,
        'purpose': res.vehiclesBean.purpose,
        'drivetype': res.vehiclesBean.drivetype,
        'bodytype1': res.vehiclesBean.bodytype1,
        'others': res.vehiclesBean.others,
        'uid': res.vehiclesBean.uid,
        'password': res.vehiclesBean.password,
        'parivahan': res.vehiclesBean.parivahan,
        'autoDebit': res.vehiclesBean.autoDebit,
        'bankName': res.vehiclesBean.bankName,
        'branchName': res.vehiclesBean.branchName,
        'ifscCode': res.vehiclesBean.ifscCode,
        'acName': res.vehiclesBean.acName,
        'acNumber': res.vehiclesBean.acNumber,
        'loanAmount': res.vehiclesBean.loanAmount,
        'loanNo': res.vehiclesBean.loanNo,
        'emiDate': res.vehiclesBean.emiDate,
        'emiDateObj':odate,
        'loanInterest': res.vehiclesBean.loanInterest,
        'loanVehicle':res.vehiclesBean.loanVehicle,

        
      
      });
     if(this.docForm.value.vehicletype == 'Two Wheeler')
     {
      this.isfourwheeler = false;
      this.textBox = false;
      this.istwowheeler = true;
     }
     else if(this.docForm.value.vehicletype == 'Four Wheeler')
     {
      this.istwowheeler = false;
      this.textBox = false;
      this.isfourwheeler = true;
     }
     else if(this.docForm.value.vehicletype =='Others')
    {
      this.isfourwheeler = false;
      this.istwowheeler = false;
      this.textBox = true;
      
    }


    },
    error: (error) => {
    }
  });

  }

  update(){
    this.vehicleMaster = this.docForm.value;
    if(this.docForm.valid){
      this.vehicleService.updatevehicle(this.vehicleMaster,this.router,this.notificationService);
    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  
  }

  onCancel(){
    this.router.navigate(['/master/vehicle/list-vehicle']);

  }
  //Events
  vehicleWheel(event)
  {

    if(event=='Two Wheeler'){
      
      this.isfourwheeler = false;
      this.textBox = false;
      this.istwowheeler = true;
    }
    else if(event=='Four Wheeler'){
     
      this.istwowheeler = false;
      this.textBox = false;
      this.isfourwheeler = true;
    }
    else if(event=='Others')
    {
      this.isfourwheeler = false;
      this.istwowheeler = false;
      this.textBox = true;
      
    }

}
loanFlag(event){
  if(event=='YES'){
  this.isLoan = true;
  }
  else if(event=='NO'){
   this.isLoan = false;
  
  }


}

  reset(){
    if(!this.edit){
      location.reload()
    this.docForm = this.fb.group({
      vehiclename: [""],
      vehicletype: [""],
      vehiclebrand :[""],
      regno:[""],
      chassisno:[""],
      engineno:[""],
      bodytype:[""],
      fueltype:[""],
      ownertype:[""],
      dateofpurc:[""],
      insurancedetails:[""],
      service:[""],
      discardFromDate:[""],
      discardFromDate1:[""],
      vehiclewheel:[""],
      colour:[""],
      age:[""],
      rtocode:[""],
      purcamount:[""],
      insurancetype: [""],
      insuredamount: [""],
      payment: ["cash"],
      insurername: [""],
      validity: [""],
      validity1: [""],
      address: [""],
      yom: [""],
      license : ["yes"],
      lin: [""],
      agency: [""],
      emiamount: [""],
      seater: [""],
      purpose: [""],
      bodytype1: [""],
      others: [""],
      drivetype: [""],
      uid: [""],
      password: [""],
      parivahan: ["yes1"],
      autoDebit: [""],
      bankName: [""],
      branchName: [""],
      ifscCode: [""],
      acName: [""],
      acNumber: [""],
      loanAmount: [""],
      loanNo: [""],
      emiDate:[""],
      emiDateObj: [""],
      loanInterest: [""],
      loanVehicle: [""],




        


 });
}else {
  this.fetchDetails(this.requestId);
}
}



getcash(check: any) {
  if (check == 'cash') {
    this.isCash = true;
  } else {
    this.isCash = false;
  }
  if (check == 'emi') {
    this.isEmi = true;
  } else {
    this.isEmi = false;
  }
}

getlicense(check: any) {
  if (check == 'yes') {
    this.isYes = true;
  }
  else if (check == 'no') {
    this.isYes = false;
  } else {
    this.isYes = false;

  }
}

getpari(check: any) {
  if (check == 'yes1') {
    this.isYes1 = true;
  }
  else if (check == 'no1') {
    this.isYes1 = false;
  } else {
    this.isYes1 = false;

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

 

  getDateString(event, inputFlag, index) {
    let cdate = this.commonService.getDate(event.target.value);
    if (inputFlag == 'discardFromDate') {
      this.docForm.patchValue({discardFromDate: cdate });
    }
    if (inputFlag == 'discardFromDate1') {
      this.docForm.patchValue({discardFromDate1: cdate });
    }
   if (inputFlag == 'validity1') {
      this.docForm.patchValue({validity1: cdate });
    }
    if (inputFlag == 'emiDate') {
      this.docForm.patchValue({emiDate: cdate });
    }
    
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
    keyPressNumberDouble(event: any) {
      const pattern = /[0-9.]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    keyPressNumberInt(event: any) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    getAutoDebit(event: any) {
      if (event) {
        this.isAutoDebit = true;
      }
      else {
        this.isAutoDebit = false;
      }
    }
}