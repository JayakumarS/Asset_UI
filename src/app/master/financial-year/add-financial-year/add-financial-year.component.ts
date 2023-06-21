import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { FinancialYearService } from '../financial-year.service';
import { FinancialYear } from '../financial-year-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-financial-year',
  templateUrl: './add-financial-year.component.html',
  styleUrls: ['./add-financial-year.component.sass']
})
export class AddFinancialYearComponent implements OnInit {
  docForm: FormGroup;
  edit:Boolean =false;
  financialYear:FinancialYear
  requestId: number;

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private financialYearService: FinancialYearService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService) {
    this.docForm = this.fb.group({
  
    financialyear: ["",[Validators.required]],
 
    description:[""],
    isactive:[true], 
    companyId:[this.tokenStorage.getCompanyId()],
    userId:[this.tokenStorage.getUserId()],
    id:[""],
    
    
 
  
}); }

  ngOnInit(): void {
    this.docForm = this.fb.group({
  
      financialyear: ["",[Validators.required]],
   
      description:[""],
      isactive:[true], 
      companyId:[this.tokenStorage.getCompanyId()],
      userId:[this.tokenStorage.getUserId()],
      id:[""],
      
      
   
    
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
  onSubmit(){
    this.financialYear = this.docForm.value;
    console.log(this.financialYear);
        if(this.docForm.valid){
          if(this.docForm.value.isactive==true)
          {
          this.docForm.value.isactive="True"
          }
          else if(this.docForm.value.isactive==false)
          {
          this.docForm.value.isactive="False"
          } 
          this.financialYear = this.docForm.value;
        console.log(this.financialYear);
        this.financialYearService.addfinancialYear(this.financialYear,this.router, this.notificationService);
        }else{
          this.showNotification(
            "snackbar-danger",
            "Please fill all the required details!",
            "top",
            "right"
          );
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
  fetchDetails(requestId: any): void {
    this.edit=true;
    const obj = {
      id: requestId
    }
    this.financialYearService.edit(obj).subscribe((res: any)=> {
      console.log(obj);


      this.docForm.patchValue({
        'financialyear': res.financialYearBean.financialyear,
        'description': res.financialYearBean.description,
        'isactive': res.financialYearBean.isactive,
        'id' :this.requestId


     })
      },
      (err: HttpErrorResponse) => {
      }
    );
  }
  update(){     
   this.financialYear = this.docForm.value;
  if(this.docForm.valid){
    this.financialYearService.updateFY(this.financialYear,this.router,this.notificationService);
  } else {
    this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
  }
}
validateFinancialYr(event) {
  if (event != undefined && event != null && event != "") {
    this.httpService.get<any>(this.financialYearService.ValidateFinancialYr + "?FY=" + event +"&companyId=" + this.tokenStorage.getCompanyId()).subscribe((res: any) => {
      if (res.validateFY) {
        this.docForm.controls['financialyear'].setErrors({ FinancialYR: true });
      }else{
       // this.docForm.controls['emailId'].setErrors(null);
      }
    });
}
}
  reset(){
    if (!this.edit) {
      location.reload();
      this.docForm = this.fb.group({
        
      financialyear: [""],
   
      description:[""],
      isactive:[true], 
      companyId:[this.tokenStorage.getCompanyId()],
      userId:[this.tokenStorage.getUserId()],
      id:[""],
        
      });
  } else {
    this.fetchDetails(this.requestId);
  }
  
  }
  onCancel(){
this.router.navigate(['master/financial/listFinancial']);

  }
}
