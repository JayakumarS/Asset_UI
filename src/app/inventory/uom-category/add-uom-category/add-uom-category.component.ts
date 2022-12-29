import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UomCategory } from '../uom-category.model';
import { UomCategoryService } from '../uom-category.service';

@Component({
  selector: 'app-add-uom-category',
  templateUrl: './add-uom-category.component.html',
  styleUrls: ['./add-uom-category.component.sass']
})
export class AddUOMCategoryComponent implements OnInit {

 
  docForm: FormGroup;
  uomCategory: UomCategory;
  requestId: number;
  dialogData: any;
  edit:boolean=false;
  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,
    public uomCategoryService: UomCategoryService,public route: ActivatedRoute,private httpService: HttpServiceService) { 

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      categoryName: ["", [Validators.required]],
      description:[""],
      active:[""],
      uomCode:[""]
    });

  }

  ngOnInit(): void {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      categoryName: ["", [Validators.required]],
      description:[""],
      active:[""],
      uomID:[""]
    });
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
    this.uomCategory = this.docForm.value;
    this.uomCategoryService.addUomCategory(this.uomCategory);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/inventory/UOM-catagory/list-UOMCategory']);
  }


  // Edit
  fetchDetails(uomID: any): void {
    this.httpService.get(this.uomCategoryService.editUomCategory + "?uomID=" + uomID).subscribe((res: any) => {
      console.log(uomID);

      this.docForm.patchValue({
        'uomID': res.uomBean.uomID,
        'categoryName': res.uomBean.categoryName,
        'description': res.uomBean.description,
        'active': res.uomBean.active,

     });
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


  update(){

    this.uomCategory = this.docForm.value;
    this.uomCategoryService.uomCategoryUpdate(this.uomCategory);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/inventory/UOM-catagory/list-UOMCategory']);

  }


  onCancel(){
    this.router.navigate(['/inventory/UOM-catagory/list-UOMCategory']);
  }



  // fetchDetails(uomCategory: any): void {
  //   this.dialogData = uomCategory;
  //   this.httpService.get<UomCategory>(this.uomCategoryService.editUomCategory, uomCategory).subscribe(data => {
  //     console.log(data);
  //     //this.dialogData = employees;
  //     },
  //     (err: HttpErrorResponse) => {

  //   });
  // }


  reset(){
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      categoryName: ["", [Validators.required]],
      description: [""],
      active: [""],
      uomID: [""]
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
