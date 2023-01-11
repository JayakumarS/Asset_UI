import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
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
      id:[""]
   
    
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

  }
  fetchDetails(category_id: any) {
    this.requestId = category_id;
  this.httpService.get(this.categoryMasterService.editcategory + "?category_id=" + category_id).subscribe((res: any) => {

    console.log(category_id);

    this.docForm.patchValue({
     
      'categoryName': res.assetCategoryBean.categoryName,
      'parentCategory': res.assetCategoryBean.parentCategory,
      'Description' : res.assetCategoryBean.Description, 
      'isactive' : res.assetCategoryBean.isactive, 
      'id' : res.assetCategoryBean.id

   })

    },
    (err: HttpErrorResponse) => {
       // error code here
    }
  );
 
}
  onSubmit(){

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
     this.categoryMasterService.addcategory(this.assetcategory);
     this.showNotification(
       "snackbar-success",
       "Successfully Added...!!!",
       "bottom",
       "center"
     );
     this.router.navigate(['/master/category/list-category']);
     }else{
       this.showNotification(
         "snackbar-danger",
         "Invalid Data...!!!",
         "bottom",
         "center"
       );
     }
     
   }

  update(){

    this.assetcategory = this.docForm.value;
    this.categoryMasterService.categoryUpdate(this.assetcategory,this.router,this.notificationservice);
    // this.router.navigate(['/master/category/list-category']);


  }
  reset() {
    this.docForm = this.fb.group({
  
      categoryName: [""],
      parentCategory: [""],
      Description:[""],
      isactive:[false],
      id:[""]
   
    
  });
   
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

}
