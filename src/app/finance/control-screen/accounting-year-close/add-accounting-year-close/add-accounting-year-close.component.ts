import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { AccountingYearCloseService } from '../accounting-year-close.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AccountingYearClose } from '../accounting-year-close.model';

@Component({
  selector: 'app-add-accounting-year-close',
  templateUrl: './add-accounting-year-close-component.html',
  styleUrls: ['./add-accounting-year-close.component.sass']
})
export class AddAccountingYearComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray = [];
  accountingYearClose: AccountingYearClose;
  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router,
              private accountingYearCloseService: AccountingYearCloseService, private httpService: HttpServiceService
    ,         private snackBar: MatSnackBar, ) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      fromdate: ["", [Validators.required]],
      todate: ["", [Validators.required]],
      location: ["", [Validators.required]]
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.accountingYearClose = this.docForm.value;
    this.accountingYearCloseService.addCurrency(this.accountingYearClose);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/finance/controlscreen/accountingyearcloae/listAccountingYear']);
  }
  reset(){}

  onCancel(){
    this.router.navigate(['/finance/controlscreen/accountingyearclose/listAccountingYear']);
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
