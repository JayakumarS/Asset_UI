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
check : any;
qtyCheck : any;
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
    categoryName: ["",[Validators.required]],
    parentCategory: [""],
    categoryType: ["", [Validators.required]],
    incomingQty:[""],
    itemCategoryId:[""],
    });
   }
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   @ViewChild('filter',  {static: true}) filter: ElementRef;

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

      this.check = res.listbean[0].incomingQty;

      if(this.check == 't'){
        this.qtyCheck = true;
      }else{
        this.qtyCheck = false;
      }

      this.docForm.patchValue({
        'categoryName': res.listbean[0].categoryName,
         'categoryType': res.listbean[0].categoryType,
        'itemCategoryId': res.listbean[0].itemCategoryId,
        'parentCategory': res.listbean[0].parentCategory,
        'incomingQty': this.qtyCheck,
        
   
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
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/inventory/item-category/list-category']);

  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onReset(){    
    this.docForm = this.fb.group({
      categoryName: [""],
      parentCategory: [""],
      categoryType: [""],
      incomingQty:[""],
      itemCategoryId:[""],
      });
  }
 
  onCancel(){
    this.router.navigate(['/inventory/item-category/list-category']);
  }

  additem(){
    const dialogRef = this.dialog.open(AddPropertiesComponent, {
     
    });
  }
  
  deleteitem(){}
}




