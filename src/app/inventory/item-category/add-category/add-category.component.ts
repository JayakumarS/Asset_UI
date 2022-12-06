import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AddPropertiesComponent } from '../add-properties/add-properties.component';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ItemCategory} from 'src/app/inventory/item-category/item-category.models';
import { ItemCategoryService } from 'src/app/inventory/item-category/item-category.service';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { ItemCategoryResultBean } from '../item-category-result-bean';


 

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  form:any;
detailRowData;
dataarray=[];
requestId:number;
catagoryType = [];
edit:boolean=false;
itemCategory:ItemCategory
dataSource:null;
exampleDatabase: ItemCategoryService | null;
displayedColumns = [
  "categoryName",
  "parentType",
  "categoryType",
  "role",
  "degree",
 
];
  constructor( private fb: FormBuilder,
    private snackBar: MatSnackBar,private httpService: HttpServiceService,
    public router: Router,public dialog: MatDialog,
     public itemCategoryService: ItemCategoryService,
     public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      categoryName: [""],
      
      parentCategory: [""],
      categoryType: ["", [Validators.required]],
      salesTaxes: ["",[Validators.required]],
      purchaseTaxes: ["",[Validators.required]],
      asserAccount: ["",[Validators.required]],
      deptAccount: ["", [Validators.required]],
      AccuDept:["",[Validators.required]],
      gender:[""],
      incomingQty:[""],
      propertyName:[""],
      propertyType:[""],
      length:[""],
      isMandantory:[""],
      batchNO:[""],
      expiryDate:[""],
      mrp:[""],
      manufactureDetails:[""],
      itemCategoryId:[""],
    });
   }
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit(): void {

      //categoryType list dropdown
  this.httpService.get<ItemCategoryResultBean>(this.itemCategoryService.getCategoryType).subscribe(
  (data) => {
    this.catagoryType = data.categoryTypeList;
    console.log(this.catagoryType);
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
    this.itemCategory = this.docForm.value;
    this.itemCategoryService.addItemCatagory(this.itemCategory);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center");
      this.router.navigate(['/inventory/item-category/list-category']);
  }

  fetchDetails(itemCategoryId: any): void {
    this.httpService.get(this.itemCategoryService.editItemCategory+"?itemCategory="+itemCategoryId).subscribe((res: any)=> {
      console.log(itemCategoryId);

      this.docForm.patchValue({
        'categoryName': res.itemCategoryBean.categoryName,
        'parentTypeName': res.itemCategoryBean.parentTypeName,
        'categoryTypeName': res.itemCategoryBean.categoryTypeName,
        'itemCategoryId': res.itemCategoryBean.itemCategoryId,
        'parentCategory': res.itemCategoryBean.parentCategory,
        'salesTaxes': res.itemCategoryBean.salesTaxes,
        'purchaseTaxes': res.itemCategoryBean.purchaseTaxes,
        'asserAccount': res.itemCategoryBean.asserAccount,

        'deptAccount': res.itemCategoryBean.deptAccount,
        'AccuDept': res.itemCategoryBean.AccuDept,
        'incomingQty': res.itemCategoryBean.incomingQty,
        'propertyName': res.itemCategoryBean.propertyName,
        'propertyType': res.itemCategoryBean.propertyType,
        'length': res.itemCategoryBean.length,
        'isMandantory': res.itemCategoryBean.isMandantory,
        'batchNO': res.itemCategoryBean.batchNO,
        'expiryDate': res.itemCategoryBean.expiryDate,
        'mrp': res.itemCategoryBean.mrp,
        'manufactureDetails': res.itemCategoryBean.manufactureDetails,
   
      })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  update(){

    this.docForm.patchValue({
      'itemCategoryId': this.requestId,
   })
    this.itemCategory = this.docForm.value;
    this.itemCategoryService.itemCategoryUpdate(this.itemCategory);
    // this.showNotification(
    //   "snackbar-success",
    //   "Edit Record Successfully...!!!",
    //   "bottom",
    //   "center"
    // );
    // this.router.navigate(['/inventory/item-properties/list-itemproperties']);

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onRest(){}
 
  onCancel(){
    this.router.navigate(['/inventory/item-category/list-category']);
  }
  additem(){
    const dialogRef = this.dialog.open(AddPropertiesComponent, {
     
    });
  }
  deleteitem(){}
}




