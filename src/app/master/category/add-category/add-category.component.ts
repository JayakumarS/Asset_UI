import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { CategoryResultBean } from '../category-result-bean';
import { Assetcategory } from '../category.model';
import { CategoryMasterService } from '../category.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit {

  docForm: FormGroup;
  requestId: any;
  edit: boolean = false;
  assetcategory: Assetcategory;
  categoryDdList=[];
  assettypelist=[];
  depreciationlist=[];
  currencylist=[];
  fieldTypeList=[{"id":"Text","text":"Text"},{"id":"Date","text":"Date"}];
  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private categoryMasterService: CategoryMasterService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService
    )
     {  this.docForm = this.fb.group({
  
      categoryName: ["",[Validators.required]],
      parentCategory: [""],
      Description:[""],
      isactive:[true],
      id:[""],
      depreciation:["",[Validators.required]],
      assettype:[""],
      currency:["",[Validators.required]],
      loginedUser: this.tokenStorage.getUserId(),
      companyId:this.tokenStorage.getCompanyId(),
      isSpec:[false],
      specificationList: this.fb.array([
        this.fb.group({
          fieldName: [""],
          fieldType: [""],
        })
      ])
      
   
    
  }); }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
      //For User login Editable mode
       this.fetchDetails(this.requestId) ;

      }
     });


     // Parent Category dropdown
     this.httpService.get<any>(this.commonService.getAssetCategoryDropdown+"?companyId="+this.tokenStorage.getCompanyId()).subscribe({
      next: (data) => {
        this.categoryDdList = data;
      },
      error: (error) => {

      }
    }
    );

    this.httpService.get<CategoryResultBean>(this.categoryMasterService.getAssetTypeDropdown).subscribe(
      (data) => {
        this.assettypelist = data.assettypelist;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<CategoryResultBean>(this.categoryMasterService.getAssetDepreciationDropdown+ "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe(
      (data) => {
        this.depreciationlist = data.depreciationlist;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    //currencyList
    this.httpService.get<CategoryResultBean>(this.categoryMasterService.getCurrencyDropdown+ "?companyId="+parseInt(this.tokenStorage.getCompanyId())).subscribe(
      (data) => {
        this.currencylist = data.currencylist;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }

  
  fetchDetails(category_id: any) {
    this.requestId = category_id;
  this.httpService.get(this.categoryMasterService.editcategory + "?category_id=" + category_id).subscribe((res: any) => {

    console.log(category_id);

    this.docForm.patchValue({
     
      'categoryName': res.assetCategoryBean.categoryName,
      'parentCategory':  parseInt(res.assetCategoryBean.parentCategory),
      'Description' : res.assetCategoryBean.Description, 
      'isactive' : res.assetCategoryBean.isactive, 
      'depreciation' : parseInt(res.assetCategoryBean.depreciation),
      'assettype' : parseInt(res.assetCategoryBean.assettype),
      'currency':  parseInt(res.assetCategoryBean.currency),
      'id' : res.assetCategoryBean.id,
      'companyId' : res.assetCategoryBean.companyId,
      'isSpec' : res.assetCategoryBean.isSpec

   })


   if (res.assetCategoryBean.specificationList != null && res.assetCategoryBean.specificationList.length > 0) {
    let dtlArray = this.docForm.controls.specificationList as FormArray;
    dtlArray.clear();
    res.assetCategoryBean.specificationList.forEach(element => {
      let dtlArray = this.docForm.controls.specificationList as FormArray;
      let arraylen = dtlArray.length;
      let newUsergroup: FormGroup = this.fb.group({
        fieldName: [element.fieldName],
        fieldType: [element.fieldType],
      })
      dtlArray.insert(arraylen, newUsergroup);
    });
  }

    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
 
}
  onSubmit(){
    this.assetcategory = this.docForm.value;
    console.log(this.assetcategory);
        if(this.docForm.valid){
          if(this.docForm.value.isactive==true)
          {
          this.docForm.value.isactive="True"
          }
          else if(this.docForm.value.isactive==false)
          {
          this.docForm.value.isactive="False"
          } 
          this.assetcategory = this.docForm.value;
        console.log(this.assetcategory);
        this.categoryMasterService.addcategory(this.assetcategory,this.router, this.notificationService);
        }else{
          this.showNotification(
            "snackbar-danger",
            "Please fill all the required details!",
            "top",
            "right"
          );
        }
     
   }

  update(){
    if(this.docForm.valid){
    this.assetcategory = this.docForm.value;
    this.categoryMasterService.categoryUpdate(this.assetcategory,this.router,this.notificationservice);
    // this.router.navigate(['/master/category/list-category']);
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right"
    );
  }

  }
  reset() {
    if (!this.edit) {
     location.reload()
    this.docForm = this.fb.group({
 
      categoryName: [""],
      parentCategory: [""],
      Description:[""],
      isactive:[true],
      id:[""],
      depreciation:[""],
      assettype:[""],
      currencye:[""],
      specificationList: this.fb.array([
        this.fb.group({
          fieldName: [""],
          fieldType: [""],
        })
      ])
   
  });
   
  }else {
    this.fetchDetails(this.requestId);
  }
}
  
  onCancel(){
    this.router.navigate(['/master/category/list-category']);
  }
  keyPressName(event: any) {
    const pattern = /[A-Z,a-z 0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
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

  // validateCatergory(event){
  //   this.httpService.get<any>(this.categoryMasterService.uniqueValidateUrl+ "?tableName=" +"assetcategory"+"&columnName="+"category_name"+"&columnValue="+event).subscribe((res: any) => {
  //     if(res){
  //       this.docForm.controls['categoryName'].setErrors({ assetcategory: true });
  //     }else{
  //       this.docForm.controls['categoryName'].setErrors(null);
  //     }
  //   });
  // }
  addRow() {
    let dtlArray = this.docForm.controls.specificationList as FormArray;
    let arraylen = dtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      fieldName: ["",[Validators.required]],
      fieldType: ["",[Validators.required]],
    })
    dtlArray.insert(arraylen, newUsergroup);
  }

  removeRow(index) {
    let dtlArray = this.docForm.controls.specificationList as FormArray;
    dtlArray.removeAt(index);
  }

  validateCategoryName(event){
    let companyId=this.tokenStorage.getCompanyId();
    this.httpService.get<any>(this.commonService.uniqueValidateCompanyBasedUrl+ "?tableName=" +"assetcategory"+"&columnName="+"category_name"+"&columnValue="+event + "&companycolumnname=" + "company_id" + "&companyvalue="+companyId).subscribe((res: any) => {
      if(res){
        this.docForm.controls['categoryName'].setErrors({ currency: true });
      }else{
        this.docForm.controls['categoryName'].setErrors(null);
      }
    });
  }
}
