import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
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

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private categoryMasterService: CategoryMasterService,
    private commonService: CommonService,
    private snackBar:MatSnackBar,
    private router:Router,private notificationservice:NotificationService,
    public route: ActivatedRoute,)
     {  this.docForm = this.fb.group({
  
      categoryName: ["",[Validators.required]],
      parentCategory: [""],
      Description:[""],
      isactive:[false],
      id:[""],
      depreciation:["",[Validators.required]],
      assettype:[""],
      currency:["",[Validators.required]]

      
      
   
    
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
     this.httpService.get<any>(this.commonService.getAssetCategoryDropdown).subscribe({
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

    this.httpService.get<CategoryResultBean>(this.categoryMasterService.getAssetDepreciationDropdown).subscribe(
      (data) => {
        this.depreciationlist = data.depreciationlist;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    //currencyList
    this.httpService.get<CategoryResultBean>(this.categoryMasterService.getCurrencyDropdown).subscribe(
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
      'id' : res.assetCategoryBean.id

   })

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
     this.categoryMasterService.addcategory(this.assetcategory,this.router);
     this.showNotification(
       "snackbar-success",
       "Successfully Added...!!!",
       "bottom",
       "center"
     );
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
      isactive:[false],
      id:[""],
      depreciation:[""],
      assettype:[""],
      currencye:[""]
   
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

}
