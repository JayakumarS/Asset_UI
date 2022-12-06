import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { InterCompanyTransferService } from '../inter-company-transfer.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InterCompanyTransfer } from '../inter-company-transfer.model';

@Component({
  selector: 'app-add-inter-company-transfer',
  templateUrl: './add-inter-company-transfer-component.html',
  styleUrls: ['./add-inter-company-transfer.component.sass']
})
export class AddInterCompanyTransferComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray = [];
  interCompanyTransfer: InterCompanyTransfer;
  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router,
              private accountingYearCloseService: InterCompanyTransferService, private httpService: HttpServiceService
    ,         private snackBar: MatSnackBar, ) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      employeeId: ["", [Validators.required]],
      transferDate: ["", [Validators.required]],
      amount: ["", [Validators.required]]
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.interCompanyTransfer = this.docForm.value;
    this.accountingYearCloseService.addCurrency(this.interCompanyTransfer);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/finance/controlscreen/intercompanytransfer/listInterCompanyTransfer']);
  }
  reset(){}

  onCancel(){
    this.router.navigate(['/finance/controlscreen/intercompanytransfer/listInterCompanyTransfer']);
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
