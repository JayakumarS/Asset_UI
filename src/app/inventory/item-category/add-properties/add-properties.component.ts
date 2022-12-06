import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ItemCategory} from 'src/app/inventory/item-category/item-category.models';
import { ItemCategoryService } from 'src/app/inventory/item-category/item-category.service';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {map} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ItemPropertiesResultBean } from '../../item-properties/item-properties-result-bean';
import { ItemPropertiesService } from '../../item-properties/item-properties.service';
@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.component.html',
  styleUrls: ['./add-properties.component.css']
})
export class AddPropertiesComponent implements OnInit {
  docForm: FormGroup;
  property:[];
  constructor(private fb: FormBuilder,private httpService: HttpServiceService,
    public router: Router,public dialog: MatDialog,
     public itemCategoryService: ItemCategoryService,
     public itemPropertiesService:ItemPropertiesService) { 
    this.docForm = this.fb.group({
     
      propertyId: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      propertyName:[""],
      propertyType:[""],
      length:[""],


    });
  }
  ngOnInit(): void {
    this.httpService.get<ItemPropertiesResultBean>(this.itemPropertiesService.getpropertyType).subscribe(
      (data) => {
        this.property = data.propertyTypeList;
        console.log(this.property);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
  onSubmit(){}
     getpropertyValue(propertyId: any): void {
      this.httpService.get(this.itemCategoryService.getPropertyValue+"?propertyId="+propertyId).subscribe((res: any)=> {
        console.log(propertyId);
    
        this.docForm.patchValue({
          'propertyName': res.itemCatagoryBean.propertyName,
          'propertyType': res.itemCatagoryBean.propertyType,
          'length': res.itemCatagoryBean.length,
       })
        },
        (err: HttpErrorResponse) => {
           // error code here
        }
      );
    }

   onCancel(){
    this.router.navigate(['/inventory/item-category/add-category']);
  }
}
