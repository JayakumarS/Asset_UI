import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { TaxMaster } from '../tax-model';
import { TaxService } from '../tax.service';


@Component({
  selector: 'app-add-tax-master',
  templateUrl: './add-tax-master.component.html',
  styleUrls: ['./add-tax-master.component.sass']
})
export class AddTaxMasterComponent implements OnInit {

  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;
  taxMaster : TaxMaster;
  constructor(private fb: FormBuilder,
    private taxMasterService : TaxService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private router:Router) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],

      taxname: [""],
      taxcode: [""],
      taxtype: [""],
      taxmethod: [""],
      taxpercentage: [""],
      taxamount: [""],
      taxid: [""],
      active:[true],
      id:[""],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId(),
      loginedUser: this.tokenStorage.getUserId(),

    });

  }

  ngOnInit(): void {
     this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;



      }
     });
  }

  onSubmit(){
    this.taxMaster = this.docForm.value;
    console.log(this.taxMaster);
    if(this.docForm.valid){

    this.taxMasterService.addTax(this.taxMaster).subscribe({
      next: (data) => {
        if (data.success) {
          this.showNotification(
            "snackbar-success",
            "Record Added successfully...",
            "bottom",
            "center"
          );
          this.router.navigate(['/master/tax/listTax']);
        } else {
          this.showNotification(
            "snackbar-danger",
            "Not Added...!!!",
            "bottom",
            "center"
          );
        }
      }
    });
  }
  }

  // Edit
  fetchDetails(id: any): void {
    this.httpService.get(this.taxMasterService.editTaxMaster+"?id="+id).subscribe((res: any)=> {
      console.log(id);
      

      this.docForm.patchValue({

        'taxname': res.taxMasterBean.taxname,
        'taxcode': res.taxMasterBean.taxcode,
        'taxtype': res.taxMasterBean.taxtype,
        'taxmethod': res.taxMasterBean.taxmethod,
        'taxpercentage': res.taxMasterBean.taxpercentage,
        'taxamount': res.taxMasterBean.taxamount,
        'taxid': res.taxMasterBean.taxid,
        'active': res.taxMasterBean.active,
        'id' : res.taxMasterBean.id
     })
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  update(){

    this.taxMaster = this.docForm.value;
    this.taxMasterService.taxMasterUpdate(this.taxMaster);
    this.showNotification(
      "snackbar-success",
      "Record Updated Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/tax/listTax']);

  }

  onCancel(){
     this.router.navigate(['/master/tax/listTax']);
  }

  reset(){
    if (!this.edit) {
    this.docForm = this.fb.group({
      taxname: [""],
      taxcode: [""],
      taxtype: [""],
      taxmethod: [""],
      taxpercentage: [""],
      taxamount: [""],
      taxid: [""],
      Description: [""],
      active: [true],
      companyId:this.tokenStorage.getCompanyId(),
      branchId:this.tokenStorage.getBranchId()

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

}

