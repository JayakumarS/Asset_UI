import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DetailRowComponent } from 'src/app/crm/customer-master/detail-row/detail-row.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { CurrencyService } from '../currency.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CurrencyMaster } from '../currency.model';
import { CommonService } from 'src/app/common-service/common.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency-component.html',
  styleUrls: ['./add-currency.component.sass']
})
export class AddCurrencyComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray = [];
  currencyMaster: CurrencyMaster;
  submitted: boolean=false;


  constructor(private fb: FormBuilder, private authService: AuthService, public commonService: CommonService,public router: Router,
              private currencyService: CurrencyService, private httpService: HttpServiceService
    ,         private snackBar: MatSnackBar,private tokenStorage: TokenStorageService ) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      currencyCode: ["", [Validators.required]],
      currencyName: ["", [Validators.required]],
      fromc: ["", [Validators.required]],
      toc: ["", [Validators.required]],
      currencyDefault : ["", [Validators.required]],
      currencyFraction : ["", [Validators.required]],
      isActive : [""],
      bookCurrency : [""],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId()
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.currencyMaster = this.docForm.value;
    this.currencyService.addCurrency(this.currencyMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/finance/master/currency/listCurrencyComponent']);
  }
  reset(){}

  keyPressName(event: any) {
    const pattern = /[A-Z,a-z]/;
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
  onCancel(){
    this.router.navigate(['/finance/master/currency/listCurrencyComponent']);
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  validateCountry(event) {
    if (event != undefined && event != null && event != "") {
      this.httpService.get<any>(this.commonService.uniqueValidateUrl + "?tableName=" + "currency" + "&columnName=" + "currency_name" + "&columnValue=" + event).subscribe((res: any) => {
        if (res) {
          this.docForm.controls['currencyName'].setErrors({ country: true });
        } else {
          this.docForm.controls['currencyName'].setErrors(null);
        }
      });
    }
  }
}
