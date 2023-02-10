import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { MustMatch } from '../mustMatch';
import { PasswordStrengthValidator } from '../passwordPolicy';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-change-password-pop-up',
  templateUrl: './change-password-pop-up.component.html',
  styleUrls: ['./change-password-pop-up.component.sass']
})
export class ChangePasswordPopUpComponent implements OnInit {
  docForm: FormGroup;
  hideOldPassword = true;
  hideNewPassword = true;
  hideconfirmNewPassword = true;
  oldPwd:boolean = false;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<ChangePasswordPopUpComponent>,private httpService: HttpServiceService,
    private commonService:CommonService,private tokenStorage: TokenStorageService,private router:Router,private app:AppService) { 
      dialogRef.disableClose = true;
    this.docForm = this.fb.group({
        oldChangepassword: ["",[Validators.required]],
        newChangePassword:["",Validators.compose([Validators.required, PasswordStrengthValidator, Validators.minLength(6)])],
        confirmChangePassword:["",[Validators.required]],
    },
    {
     validator: MustMatch('newChangePassword', 'confirmChangePassword')
    });

  }

  ngOnInit(): void {
  }

  updatePassword(){
    // Creating the object
    if(this.docForm.valid){
      const obj = {
        newChangePassword: this.docForm.value.newChangePassword,
        emailId: this.tokenStorage.getUsername(),
      };
      this.httpService.post<any>(this.commonService.updateChangePasswordUrl,obj).subscribe(data => {
        console.log(data);
        if(data.success){
          this.dialogRef.close();
          this.commonService.showNotification(
            "snackbar-success",
            "Password Updated...!!!",
            "bottom",
            "center"
          );
          this.tokenStorage.signOut();
          this.app.SetName('');
          localStorage.removeItem("currentUser");
          this.router.navigate(['/authentication/signin']);
      

        }
        },
        );
        
    }
    
  }

  cancel(){
    this.dialogRef.close();
  }
  
  validateOldPassword(event){
    console.log(this.tokenStorage.getUsername());
    console.log(event);
    this.httpService.get<any>(this.commonService.validateOldPasswordUrl+ "?validatePassword=" + event+"&userId="+this.tokenStorage.getUsername()).subscribe((res: any) => {
        if(res.success){
          this.docForm.controls['oldChangepassword'].setErrors(null);
        }else{
          this.docForm.controls['oldChangepassword'].setErrors({ oldPwd: true });
        }
      });
  }

  validateOldPasswordAndNewPassword(event){
    if(event === this.docForm.controls['oldChangepassword'].value){
      this.docForm.controls['newChangePassword'].setErrors({ oldValid: true });
    } else{
      this.docForm.controls['newChangePassword'].setErrors(null);
    }
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
}
