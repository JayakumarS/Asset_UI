import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ExampleDataSource } from 'src/app/admin/employees/allEmployees/allemployees.component';
import { EmployeesService } from 'src/app/admin/employees/allEmployees/employees.service';
import { DetailRowComponent } from 'src/app/operations/boo/detail-row/detail-row.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { StockVerificationService } from '../stock-verification.service';
import { StockVerification } from '../stock-verification-model';
import { StockVerificationResultBean } from '../stock-verification-result-bean';

@Component({
  selector: 'app-add-stock-verification',
  templateUrl: './add-stock-verification.component.html',
  styleUrls: ['./add-stock-verification.component.sass']
})
export class AddStockVerificationComponent implements OnInit {
  docForm: FormGroup;
  dataSource: ExampleDataSource | null;
  exampleDatabase: EmployeesService | null;
  
  hide3 = true;
  agree3 = false;
  dataarray=[];
  //cusMasterData =[];
  stockVerification:StockVerification;
  detailRowData = new DetailRowComponent;
  displayedColumns = ['propertyType', 'propertyName','type','isMandatory','availableQty','differenceQty','stockAdjustment','status'];
  stockVerificationList: any;
  requestId: any;
  // snackBar: any;
  // httpService: any;
  StockVerificationService: any;
  edit: boolean;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private stockVerificationService: StockVerificationService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService
    )
     {
    this.docForm = this.fb.group({
      stockVerificationNo: ["", [Validators.required]],
      location: ["",[Validators.required]],
      date: ["", [Validators.required]],
      verifiedBy: ["", [Validators.required]],
      organizationName: ["", [Validators.required]],
      jobTitle: [""],
      // propertyType: [""],
      // propertyName: [""],
      // type: [""],
      // isMandatory: [""],
      // availableQty: [""],
    });
   }

  ngOnInit(): void { this.httpService.get<StockVerificationResultBean>(this.StockVerificationService.stockListUrl).subscribe(
    (data) => {
     // this.currencyList = data.currencyList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );
  this.route.params.subscribe(params => {
   if(params.id!=undefined && params.id!=0){
    this.requestId = params.id;
    this.edit=true;
    //For User login Editable mode
    this.fetchDetails(this.requestId) ;

   }
  });
  }
  // onSubmit() {
  //   console.log("Form Value", this.docForm.value);
  // }
  onSubmit() {
    this.stockVerification = this.docForm.value;
    console.log(this.stockVerification);
    this.stockVerificationService.stockSave(this.stockVerification);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/inventory/stockVerification/listStockVerification']);
  }
  fetchDetails(countryCode: any): void {
    this.httpService.get(this.StockVerificationService.editCountryMaster + "?stockVerification=" + countryCode).subscribe((res: any) => {
      console.log(countryCode);

      this.docForm.patchValue({
        'stockVerificationNo': res.stockVerificationBean.stockVerificationNo,
        'location': res.stockVerificationBean.location,
        'date': res.stockVerificationBean.date,
        'verifiedBy': res.stockVerificationBean.verifiedBy,
        'organizationName': res.stockVerificationBean.organizationName,
        'jobTitle': res.stockVerificationBean.jobTitle,
         
      })
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  
 onCancel(){
     this.router.navigate(['/inventory/stockVerification/listStockVerification']);
}
  reset(){
   
    
  }
  refresh(){}
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
