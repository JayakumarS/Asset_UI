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

@Component({
  selector: 'app-add-financial-year',
  templateUrl: './add-financial-year.component.html',
  styleUrls: ['./add-financial-year.component.sass']
})
export class AddFinancialYearComponent implements OnInit {
  docForm: FormGroup;
  edit:Boolean =false;
  financialYear:FinancialYear
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
    userId:[this.tokenStorage.getUserId()]
    
    
    
 
  
}); }

  ngOnInit(): void {
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
  update(){

  }
  reset(){

  }
  onCancel(){

  }
}
