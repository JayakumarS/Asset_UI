import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';
import { CountryMaster } from '../country-master.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CountryMasterResultBean } from '../country-master-result-bean';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-country-master',
  templateUrl: './add-country-master.component.html',
  styleUrls: ['./add-country-master.component.sass']
})
export class AddCountryMasterComponent implements OnInit {
  [x: string]: any;

  docForm: FormGroup;
  countryMaster: CountryMaster;
  currencyList:[];
  requestId: number;
  edit:boolean=false;

  constructor(private fb: FormBuilder,
    public router:Router,
    private snackBar: MatSnackBar,
    private countryMasterService: CountryMasterService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,) { 

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      
      categoryName: ["", [Validators.required]],
      description:[""],
      parentCategory:[""],
      isActive:[""],
      categoryId:[""]
    });

  }
  
   ngOnInit()  {
    
     //Currency list dropdown
    this.httpService.get<CountryMasterResultBean>(this.countryMasterService.currencyListUrl).subscribe(
       (data) => {
         this.currencyList = data.currencyList;
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

  onSubmit(){
    this.countryMaster = this.docForm.value;
    console.log(this.countryMaster);
    this.countryMasterService.addCountry(this.countryMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/category-Master/list-CategoryMaster']);
  }
  fetchDetails(categoryId: any): void {
    this.httpService.get(this.countryMasterService.editCountryMaster + "?countryMaster=" + categoryId).subscribe((res: any) => {
      console.log(categoryId);

      this.docForm.patchValue({
    
        'categoryId': res.countryMasterBean.categoryId,
        'categoryName': res.countryMasterBean.categoryName,
        'description': res.countryMasterBean.description,
        'parentCategory': res.countryMasterBean.parentCategory,
        'isActive': res.countryMasterBean.isActive,
        
        
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
  
  update() {

    this.countryMaster = this.docForm.value;
    this.countryMasterService.countryUpdate(this.countryMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/category-Master/list-CategoryMaster']);

  }

  onCancel(){
    this.router.navigate(['/master/category-Master/list-CategoryMaster']);
  }
  
  reset(){
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      
      categoryName: [""],
      description:[""],
      parentCategory:[""],
      isActive:[""],
      
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

}
