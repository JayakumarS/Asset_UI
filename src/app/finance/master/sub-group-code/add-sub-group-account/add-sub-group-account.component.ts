import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { SubGroupAccountService } from '../sub-group-account.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SubGroupAccountMaster } from '../sub-group-account.model';

@Component({
  selector: 'app-add-sub-group-account',
  templateUrl: './add-sub-group-account-component.html',
  styleUrls: ['./add-sub-group-account.component.sass']
})
export class AddSubGroupAccountComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray = [];
  subGroupAccountMaster: SubGroupAccountMaster;
  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router,
              private subGroupAccountService: SubGroupAccountService, private httpService: HttpServiceService
    ,         private snackBar: MatSnackBar, ) {
    this.docForm = this.fb.group({
      grpHeadCode: ["", [Validators.required]],
      subGroupName: ["", [Validators.required]],
      subGroupDesc: ["", [Validators.required]],
      lAttributes : [[]]
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.subGroupAccountMaster = this.docForm.value;
    console.log(this.subGroupAccountMaster);
    this.subGroupAccountService.addAccountHeadMaster(this.subGroupAccountMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/finance/master/subGroupAccount/listSubGroupAccountComponent']);
  }
  reset(){}

  onCancel(){
    this.router.navigate(['/finance/master/subGroupAccount/listSubGroupAccountComponent']);
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
