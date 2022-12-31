import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyMasterService } from '../currency-master.service';
import { CurrencyMaster } from '../currency-master.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CurrencyMasterResultBean } from '../currency-master-result-bean';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-add-currency-master',
  templateUrl: './add-currency-master.component.html',
  styleUrls: ['./add-currency-master.component.sass']
})
export class AddCurrencyMasterComponent implements OnInit {
  [x: string]: any;

  docForm: FormGroup;
  currencyMaster: CurrencyMaster;

  constructor(private fb: FormBuilder,
              public router: Router,
              // tslint:disable-next-line:no-shadowed-variable
              private CurrencyMasterService: CurrencyMasterService,
              private httpService: HttpServiceService,
              private snackBar: MatSnackBar,
              public route: ActivatedRoute,
    ) {

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
    this.currencyMaster = this.docForm.value;
    console.log(this.currencyMaster)
    this.CurrencyMasterService.addCurrency(this.currencyMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/currencyMaster/listCurrency']);
  }

  fetchDetails(currencyId: any): void {
    const obj = {
      editId: currencyId
    }
    this.CurrencyMasterService.editAsset(obj).subscribe({
      next: (res) => {
      this.docForm.patchValue({
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

    this.currencyMaster = this.docForm.value;
    this.CurrencyMasterService.currencyUpdate(this.currencyMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/currencyMaster/listCurrency']);

  }
  onCancel() {
    this.router.navigate(['/master/currencyMaster/listCurrency']);
  }

  reset() {
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
    });

   }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
