import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { Bday } from '../birthday-reminder-model';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { BirthdayReminderService } from '../birthday-reminder.service';


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
  selector: 'app-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.sass'],
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
export class AddBirthdayComponent implements OnInit {
  docForm: FormGroup;
 
  edit: any;
  submitted: boolean;
 
  bday: Bday;
  requestId: any;
 
  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private tokenStorage: TokenStorageService,
    public httpClient: HttpClient,
    public route: ActivatedRoute,
    private router:Router,
    private httpService: HttpServiceService,
    private serverUrl: serverLocations,
    private notificationService: NotificationService,
    private birthdayReminderService: BirthdayReminderService,) 
  {   
    this.docForm = this.fb.group({
      loginedUser: this.tokenStorage.getUserId(),
    
 
    
    bdayDtl: this.fb.array([
     this.fb.group({
       rname:["",[Validators.required]],
       birthdaydate:["",[Validators.required]],
       birthdaydateObj:["",[Validators.required]],
       setreminder: [true],
       loginedUser: this.tokenStorage.getUserId(),

       
      

     })
   ])


 })
}

 
onSubmit(){
  this.submitted = true;
  this.bday = this.docForm.value;

   if(this.docForm.valid){ 
this.birthdayReminderService.savebday(this.bday,this.router,this.notificationService);
   } else {
     this.notificationService.showNotification(
       "snackbar-danger",
       "Please fill all the required details!",
       "top",
       "right");
   }
  

 }
  
 showNotification(colorName, text, placementFrom, placementAlign) {
  
 }
 
getDateString(event, inputFlag, index) {
  let cdate = this.commonService.getDate(event.target.value);
  if(inputFlag=='birthdaydate'){
      let  bdayDtl= this.docForm.controls.bdayDtl as FormArray;
      bdayDtl.at(index).patchValue({
        birthdaydate: cdate
        });
      this.docForm.patchValue({birthdaydate:cdate});
    } 
  }
  removeRowSelf(index){
    let dtlArray = this.docForm.controls.bdayDtl as FormArray;
    // if(index != 0){
    dtlArray.removeAt(index);
    // }
  
  }
  onAddRow() {
    let dtlArray = this.docForm.controls.bdayDtl as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      rname:["",[Validators.required]],
      birthdaydate:["",[Validators.required]],
      birthdaydateObj:["",[Validators.required]],
      setreminder: [true],
      loginedUser: this.tokenStorage.getUserId(),
  
    })
    dtlArray.insert(arraylen,newUsergroup);
  }
  keyPressString(event: any) {
    const pattern = /[A-Z, a-z]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  reset(){
    if (!this.edit) {
      this.docForm.reset();
      location.reload();
      this.docForm = this.fb.group({
      bdayDtl: this.fb.array([ 
        this.fb.group({
          rname:[""],
          birthdaydate:[""],
          birthdaydateObj:[""],
          setreminder: [false],
         
        
        })
      ])
    });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       //this.fetchDetails(this.requestId) ;
      }
     });

    
  }

}
