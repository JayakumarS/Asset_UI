import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { AccountHeadMasterService } from '../account-head.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AccountHeadMaster } from '../account-head.model';

@Component({
  selector: 'app-account-head',
  templateUrl: './add-account-head-component.html',
  styleUrls: ['./add-account-head.component.sass']
})
export class AddAccountHeadComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray = [];
  accountHeadMaster: AccountHeadMaster;
  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router,
              private accountHeadMasterService: AccountHeadMasterService, private httpService: HttpServiceService
    ,         private snackBar: MatSnackBar, ) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      grpHeadName: ["", [Validators.required]],
      accountHeadName: ["", [Validators.required]],
      type: ["", [Validators.required]],
      currencyCode: ["", [Validators.required]],
      description : [""],
      isMandatory : [""],
      isActive : [""],
      lAttributes : [[]]
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.accountHeadMaster = this.docForm.value;
    console.log(this.accountHeadMaster);
    this.accountHeadMasterService.addAccountHeadMaster(this.accountHeadMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/finance/master/accountHead/listAccountHeadComponent']);
  }
  reset(){}

  onCancel(){
    this.router.navigate(['/finance/master/accountHead/listAccountHeadComponent']);
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
