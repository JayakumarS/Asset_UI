import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyMasterService } from '../currency-master.service';
import { CurrencyMaster } from '../currency-master.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CurrencyMasterResultBean } from '../currency-master-result-bean';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CurrencyService } from 'src/app/finance/master/currency/currency.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-add-currency-master',
  templateUrl: './add-currency-master.component.html',
  styleUrls: ['./add-currency-master.component.scss']
})
export class AddCurrencyMasterComponent implements OnInit {
  [x: string]: any;
  docForm: FormGroup;
  currencyMaster: CurrencyMaster;
  submitted: boolean=false;

  constructor(private fb: FormBuilder,
              public router: Router,
              private currencyService: CurrencyService,
              // tslint:disable-next-line:no-shadowed-variable
              private CurrencyMasterService: CurrencyMasterService,
              private httpService: HttpServiceService,
              private snackBar: MatSnackBar,
              public route: ActivatedRoute,
              public tokenStorage: TokenStorageService,
              private spinner: NgxSpinnerService,
    ) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      currencyId: [""],
      currencyCode: ["", [Validators.required]],
      currencyName: ["", [Validators.required]],
      fromcurrency: ["", [Validators.required]],
      toCurrency: ["", [Validators.required]],
      defaultValue: ["", [Validators.required]],
      fractionPart: ["", [Validators.required]],
      isActive: [""],
      bookCurrency: [""],
      designation: [""],
      loginedUser: this.tokenStorage.getUserId(),
    });

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        // For User login Editable mode
        this.fetchDetails(this.requestId);
      }
    });
  }

  onSubmit() {
    this.submitted=true;
    if(this.docForm.valid){
      this.currencyMaster = this.docForm.value;
      this.spinner.show();
      this.CurrencyMasterService.addCurrency(this.currencyMaster).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Record Added successfully...",
              "bottom",
              "center"
            );
            this.onCancel();
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Added...!!!",
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        }
      });
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please Fill The All Required fields",
        "bottom",
        "center"
      );
    }
  }
  fetchDetails(currencyId: any): void {
    const obj = {
      editId: currencyId
    }
    this.CurrencyMasterService.editAsset(obj).subscribe({
      next: (res) => {
      this.docForm.patchValue({
        'currencyId': res.currencyMasterBean.currencyId,

        'currencyCode': res.currencyMasterBean.currencyCode,
        'currencyName': res.currencyMasterBean.currencyName,
        'fromcurrency': res.currencyMasterBean.fromcurrency,
        'toCurrency': res.currencyMasterBean.toCurrency,
        'defaultValue': res.currencyMasterBean.defaultValue,
        'fractionPart': res.currencyMasterBean.fractionPart,
        'isActive': res.currencyMasterBean.isActive,
        'bookCurrency': res.currencyMasterBean.bookCurrency,

      });
    },
    error: (error) => {
    }
  });
}

  update() {
    this.submitted=true;
      this.currencyMaster = this.docForm.value;
      this.spinner.show();
    this.CurrencyMasterService.updateCountry(this.currencyMaster).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.success) {
            this.showNotification(
              "snackbar-success",
              "Edit Record Successfully",
              "bottom",
              "center"
            );
            this.onCancel();
          } else {
            this.showNotification(
              "snackbar-danger",
              "Not Updated Successfully...!!!",
              "bottom",
              "center"
            );
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        }
      });
    }

  onCancel() {
    this.router.navigate(['/master/currencyMaster/listCurrency']);
  }

  reset() {
    if (!this.edit) {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      currencyCode: ["", [Validators.required]],
      currencyName: ["", [Validators.required]],
      fromcurrency: ["", [Validators.required]],
      toCurrency: ["", [Validators.required]],
      emailId: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      defaultValue: ["", [Validators.required]],
      fractionPart: ["", [Validators.required]],
      isActive: [""],
      bookCurrency: [""],
      designation: [""],
      loginedUser: this.tokenStorage.getUserId(),
    });
  } else {
    this.fetchDetails(this.requestId);
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

  keyPressName(event: any) {
    const pattern = /[A-Z,a-z 0-9]/;
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
  keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validateCurrencyCode(event){
    this.httpService.get<any>(this.CurrencyMasterService.uniqueValidateUrl+ "?tableName=" +"currency"+"&columnName="+"currency_code"+"&columnValue="+event).subscribe((res: any) => {
      if(res){
        this.docForm.controls['currencyCode'].setErrors({ currency: true });
      }else{
        this.docForm.controls['currencyCode'].setErrors(null);
      }
    });
  }

}
