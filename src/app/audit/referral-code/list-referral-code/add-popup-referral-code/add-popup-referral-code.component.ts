import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ReferralCode } from '../../referral-code.model';
import { ReferralCodeService } from '../../referral-code.service';

@Component({
  selector: 'app-add-popup-referral-code',
  templateUrl: './add-popup-referral-code.component.html',
  styleUrls: ['./add-popup-referral-code.component.sass']
})
export class AddPopupReferralCodeComponent implements OnInit {
  docForm: FormGroup;
  edit: boolean = false;
  totalValue1: number;
  referralcode: ReferralCode;
  auditList = [];
  percentageList = [];
  referralCodeEdit = [];
  refCodeAddArray: string[] = [""];
  refCodeUpd: boolean[] = [true];
  placeId: string;
  selectedOptionText: string;
  constructor(

    public dialogRef: MatDialogRef<AddPopupReferralCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public httpClient: HttpClient,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public referralCodeService: ReferralCodeService,
    public commonService: CommonService,
    private snackBar: MatSnackBar,
    public tokenStorage: TokenStorageService,

  ) {


    this.docForm = this.fb.group({
      referralCode: ["", [Validators.required]],
      auditor: ["", [Validators.required]],
      loginedUser: [this.tokenStorage.getUserId()],
      referralCodeEdit: [],
      discount: ["", [Validators.required, Validators.pattern('^(?:[1-9]|[1-9][0-9]|100)$')]],
      referralCodeEditNew: this.fb.array([
        this.fb.group({
          isActive: true,
          refCode: [""]

        })
      ])
    });
  }

  ngOnInit(): void {

    this.edit = this.data.edit;

    this.httpService.get<any>(this.commonService.getUserBasedAuditList + "?userid=" + this.docForm.value.loginedUser).subscribe({
      next: (data) => {
        this.auditList = data;
        this.docForm.patchValue({
          'auditor': data[0].id1

        })
      },
      error: (error) => {

      }
    }
    );

    this.httpService.get<any>(this.commonService.getPercentageList).subscribe({
      next: (data) => {
        this.percentageList = data;
      },
      error: (error) => {

      }
    }
    );

    if (this.edit)
      this.fetchDetails(this.data.refcode);

  }


  fetchDetails(id) {

    this.httpService.get(this.referralCodeService.edit + "?id=" + id).subscribe((res: any) => {
      console.log(res);
      this.referralCodeEdit = res.referralDetails;

      this.docForm.patchValue({
        'auditor': res.referralCodeBean.auditor,
        // 'referralCodeEdit': res.referralDetails,
        'refCodeUpd': res.referralCodeBean.refCodeUpd

      })
      let manageAuditDtlArray = this.docForm.controls.referralCodeEditNew as FormArray;
      manageAuditDtlArray.removeAt(0);

      if (res.referralDetails != null) {
        res.referralDetails.forEach(element => {
          let manageAuditDtlArray = this.docForm.controls.referralCodeEditNew as FormArray;
          let arraylen = manageAuditDtlArray.length;
          let newUsergroup: FormGroup = this.fb.group({
            refCode: [element.refCode],
            isActive: [element.isActive]
          })
          manageAuditDtlArray.insert(arraylen, newUsergroup);
        });
      }


    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );

  }



  onChange(value: number) {
    let shortName = (this.auditList.find(x => x.id1 == value)?.text).split("-");
    this.docForm.patchValue({
      'referralCode': shortName[0]
    })
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit() {

    if (this.docForm.valid) {
      this.referralcode = this.docForm.value;
      this.docForm.value.refCodeUpd = this.refCodeUpd;
      this.docForm.value.referralCodeEdit = this.refCodeAddArray;


      this.httpService.post<any>(this.referralCodeService.save, this.docForm.value).subscribe(data => {
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added Successfully...!!!",
            "bottom",
            "center"
          );
          this.cancel();
          this.router.navigate(['audit/referralcode/listReferralCode']);
        }
        else {
          this.showNotification(
            "snackbar-danger",
            data.message + "...!!!",
            "bottom",
            "center"
          );
        }

      },
        (err: HttpErrorResponse) => {

        });
    } else {
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );

    }


  }

  update() {

    // this.docForm.value.referralCodeEdit = this.referralCodeEdit;
    // this.docForm.value.refCodeUpd = this.refCodeUpd;
    this.httpService.post<any>(this.referralCodeService.update, this.docForm.value).subscribe(data => {
      if (data.success) {
        this.showNotification(
          "snackbar-success",
          "Record Added Successfully...!!!",
          "bottom",
          "center"
        );
        this.cancel();
        this.router.navigate(['audit/referralcode/listReferralCode']);
        location.reload();
      }
      else {
        this.showNotification(
          "snackbar-danger",
          data.message + "...!!!",
          "bottom",
          "center"
        );
      }

    },
      (err: HttpErrorResponse) => {

      });
  }



  //  reset(){
  //   if (!this.edit) {
  //   this.docForm = this.fb.group({
  //     name: [""],
  //     code: [""],
  //     active: [""],

  //   });
  // } else {
  //   //this.fetchDetails(this.requestId);
  // }
  // }

  reset() {
    // if (!this.edit) {
    this.docForm.reset();
    this.docForm.patchValue({
      code: [""],

    })
    // } else {
    //   this.fetchDetails(this.requestId);
    // }
  }

  cancel(): void {
    this.dialogRef.close({ data: 'CANCEL' });
  }



}
