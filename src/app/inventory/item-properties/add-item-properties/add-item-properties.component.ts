import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router , ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ItemProperties } from '../item-properties-model';
import { ItemPropertiesService } from '../item-properties.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ItemPropertiesResultBean } from 'src/app/inventory/item-properties/item-properties-result-bean';



@Component({
  selector: 'app-add-item-properties',
  templateUrl: './add-item-properties.component.html',
  styleUrls: ['./add-item-properties.component.sass']
})
export class AddItemPropertiesComponent implements OnInit {
  docForm: FormGroup;
  itemProperties:ItemProperties;
  property:[];
  typevalue:[];
  requestId:number;
  edit:boolean=false;
  
  constructor(private fb: FormBuilder,
    public router:Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public itemPropertiesService: ItemPropertiesService,
    public route: ActivatedRoute,
    private httpService: HttpServiceService) { 

    this.docForm = this.fb.group({
      propertyName: ["", [Validators.required]],
      defaultValue: ["",[Validators.required]],
      value: [""],
      type:[""],
      propertyType:[""],
      active:[""],
      length:[""],
      id:[""],
      text:[""],
      typeId:[""],
      typeName:[""],
      itemPropertyId:[""],
    });

  }

  ngOnInit(): void {
    //propertyType list dropdown
this.httpService.get<ItemPropertiesResultBean>(this.itemPropertiesService.getpropertyType).subscribe(
  (data) => {
    this.property = data.propertyTypeList;
    console.log(this.property);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + " " + error.message);
  }
);

//type list

this.httpService.get<ItemPropertiesResultBean>(this.itemPropertiesService.gettypeList).subscribe(
  (data) => {
    this.typevalue = data.dataTypeList;
    console.log(this.typevalue);
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
    this.itemProperties = this.docForm.value;
    this.itemPropertiesService.addItemProperties(this.itemProperties);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center");
      this.router.navigate(['/inventory/item-properties/list-itemproperties']);
  }

  fetchDetails(itemPropertyId: any): void {
    this.httpService.get(this.itemPropertiesService.editItemProperties+"?itemProperties="+itemPropertyId).subscribe((res: any)=> {
      console.log(itemPropertyId);

      this.docForm.patchValue({
        'propertyName': res.itemPropertiesBean.propertyName,
        'defaultValue': res.itemPropertiesBean.defaultValue,
        'value': res.itemPropertiesBean.value,
        'type': res.itemPropertiesBean.type,
        'active': res.itemPropertiesBean.active,
        'propertyType': res.itemPropertiesBean.propertyType,
        'length': res.itemPropertiesBean.length,
        'itemPropertyId': res.itemPropertiesBean.itemPropertyId,
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){

    this.itemProperties = this.docForm.value;
    this.itemPropertiesService.itemPropertiesUpdate(this.itemProperties);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/inventory/item-properties/list-itemproperties']);

  }

  onCancel(){
    this.router.navigate(['/inventory/item-properties/list-itemproperties']);
  }
  
  reset(){}

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
