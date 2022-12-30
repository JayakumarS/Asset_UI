import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleDataSource } from 'src/app/admin/employees/allEmployees/allemployees.component';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ItemMasterService } from '../item-master.service';
import { MultipleRowComponent } from 'src/app/inventory/item-master/multiple-row/multiple-row.component';
import { ItemMaster } from '../item-master.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemMasterResultBean } from '../item-master-result-bean';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item-master.component.html',
  styleUrls: ['./add-item-master.component.sass']
})
export class AddItemMasterComponent implements OnInit {
  docForm: FormGroup;
  itemMaster:ItemMaster;
  edit:boolean=false;
  hide3 = true;
  agree3 = false;
  itemList=[];
  dataarray=[];
  listOfItem = [];
  datas:any;
  itemMasterDetailBean=[];
  parentCategoryList:[];
  categoryList:[];
  itemMasterDetailsList:[];
  catagoryTypeDropDownList:[];
  fetchItemCategoryList:[];
  uomList = [];
  commonDropDownItemTypeList= [];
  
  // For Encryption
  requestId: any;
  decryptRequestId: any;
  vendorList: any;
  product:Boolean=false;
  productDetail:[];
  itemName: any;
  itemDescription= [];
  locationList: any;

  constructor(private fb: FormBuilder,
    private itemMasterService: ItemMasterService,
    private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
    public route: ActivatedRoute, private commonService: CommonService,
    public notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.docForm = this.fb.group({
      size: [""],
      remarks: [],
      itemId: [""],
      itemCode: ["", [Validators.required]],
      itemName: ["", [Validators.required]],
      itemDescription: ["", [Validators.required]],
      itemType: ["", [Validators.required]],
      itemCategory: ["", [Validators.required]],
      blno: ["", [Validators.required]],
      location: [""],
      saleable: [""],
      purchaseable: [""],
      purchaseReq: [""],
      costingMethod: [""],
      costPrice: [""],
      warranty: [""],
      leadTime: [""],
      purchaseMethod: [""],
      purchaseUom: [""],
      reorderLevel: [""],
      minimumQty: [""],
      maximumQty: [""],
      //GRN
      batchNo: [""],
      mrp: [""],
      expiryDate: [""],
      manufactureDetails: [""],
      //INVENTORY
      inventoryValuation: [""],
      issueMethod: [""],
      openingBalance: [""],
      defaultPrice: [""],
      //Vendor 
      itemMasterDetailBean: this.fb.array([
        this.fb.group({
          itemId: '',
          vendorName: '',
          vendorItemName: '',
          vendorItemCode: '',
          itemCode: '',
          itemName: '',
          vendorminimumQty: '',
          vendorUom: '',
          deliveryLeadTime: '',
          paymentMethod: '',
        })
      ]),
      productDetailBean: this.fb.array([
        this.fb.group({
          itemId: '',
          itemCode: '',
          itemName: '',
          itemDescription: ''
        })
      ])
    });

    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != 0) {
        this.requestId = params.id;
        this.edit = true;
        //For Editable mode
        this.fetchDetails(this.requestId);
      }
    });

    //Parent Category Dropdown List
    this.httpService.get<any>(this.commonService.getParentCategoryDropdown).subscribe({
      next: (data) => {
        this.parentCategoryList = data;
      },
      error: (error) => {
      }
    });

    //Item Type Dropdown List
    this.httpService.get<any>(this.commonService.getCommonDropdownByformId + "?formFieldId=" + 1).subscribe({
      next: (data) => {
        this.commonDropDownItemTypeList = data;
      },
      error: (error) => {
      }
    });

    //Location Dropdown List
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationList = data;
      },
      error: (error) => {
      }
    });

    //Vendor  Dropdown List
    this.httpService.get<any>(this.commonService.getVendorDropdown).subscribe({
      next: (data) => {
        this.vendorList = data;
      },
      error: (error) => {
      }
    });

    //UOM Dropdown List
    this.httpService.get<any>(this.commonService.getUOMDropdown).subscribe({
      next: (data) => {
        this.uomList = data;
      },
      error: (error) => {
      }
    });

    //Item Master Dropdown List
    this.httpService.get<any>(this.commonService.getItemMasterDropdown).subscribe({
      next: (data) => {
        this.itemList = data;
      },
      error: (error) => {
      }
    });
  }


  onSubmit(){
  //  if(this.docForm.valid){
      this.itemMaster = this.docForm.value;
      console.log(this.itemMaster);
      this.itemMasterService.addItem(this.itemMaster,this.router,this.notificationService);
  //  }
    // else {
    //   this.showNotification(
    //     "snackbar-danger",
    //     "Please fill all the required details!",
    //     "top",
    //     "right");
    // }  
  }
  fetchDetails(itemId: any): void {
    this.httpService.get(this.itemMasterService.editItem +"?itemMaster="+encodeURIComponent(itemId)).subscribe((res: any) => {
      console.log(itemId);
 
      this.docForm.patchValue({
        'itemId': res.itemMasterBean.itemId,
        'itemCode': res.itemMasterBean.itemCode,
        'itemName': res.itemMasterBean.itemName,
        'itemDescription': res.itemMasterBean.itemDescription,
        'blno': res.itemMasterBean.blno,
        'location': res.itemMasterBean.location,
        'itemType': res.itemMasterBean.itemType,
        'itemCategory': res.itemMasterBean.itemCategory+"",
        'saleable': res.itemMasterBean.saleable,
        'purchaseable': res.itemMasterBean.purchaseable,
        'purchaseReq':res.itemMasterBean.purchaseReq,
        'costingMethod':res.itemMasterBean.costingMethod+"",
        'costPrice':res.itemMasterBean.costPrice,
        'warranty':res.itemMasterBean.warranty,
        'leadTime':res.itemMasterBean.leadTime,
        'purchaseMethod':res.itemMasterBean.purchaseMethod+"",
        'purchaseUom':res.itemMasterBean.purchaseUom+"",
        'reorderLevel':res.itemMasterBean.reorderLevel,
        'minimumQty':res.itemMasterBean.minimumQty,
        'maximumQty':res.itemMasterBean.maximumQty,
       //GRN
        'batchNo':res.itemMasterBean.batchNo,
        'mrp':res.itemMasterBean.mrp,
        'expiryDate':res.itemMasterBean.expiryDate,
        'manufactureDetails':res.itemMasterBean.manufactureDetails,
        //INVENTORY
         'inventoryValuation':res.itemMasterBean.inventoryValuation+"",
         'issueMethod':res.itemMasterBean.issueMethod+"",
         'openingBalance':res.itemMasterBean.openingBalance+"",
         'defaultPrice':res.itemMasterBean.defaultPrice,
        //SPECIFICATION.
         'size':res.itemMasterBean.size,
         'remarks':res.itemMasterBean.remarks
      })
      this.dataarray = res.itemMasterDetailBean;

     let itemMasteDtlArray = this.docForm.controls.itemMasterDetailBean as FormArray;
     itemMasteDtlArray.removeAt(0);
    res.itemMasterDetailBean.forEach(element => {
        let itemMasteDtlArray = this.docForm.controls.itemMasterDetailBean as FormArray;
        let arraylen = itemMasteDtlArray.length;
        let newUsergroup: FormGroup = this.fb.group({
        
         itemId:[element.itemId],
         vendorName:[element.vendorName+""],
         vendorItemName:[element.vendorItemName],
         vendorItemCode:[element.vendorItemCode],
         itemCode:[element.itemCode],
         itemName:[element.itemName],
         vendorminimumQty:[element.vendorminimumQty],
         vendorUom:[element.vendorUom],
         deliveryLeadTime:[element.deliveryLeadTime+""],
         paymentMethod:[element.paymentMethod+""],
      })
      itemMasteDtlArray.insert(arraylen,newUsergroup);
        
      });
      let productDetailBeanArray = this.docForm.controls.productDetailBean as FormArray;
      productDetailBeanArray.removeAt(0);
      res.productDetailBean.forEach(element => {
        let productDetailBeanArray = this.docForm.controls.productDetailBean as FormArray;
        let arraylen = productDetailBeanArray.length;
        let newUsergroup: FormGroup = this.fb.group({
            itemId: [""],
            itemName: [element.itemName+""],              
            itemDescription: [element.itemDescription],                 
        })
        productDetailBeanArray.insert(arraylen, newUsergroup);
  
      });
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  update() {

    this.itemMaster = this.docForm.value;
  //  this.itemMaster.itemMasterDetailBean = this.dataarray;
    this.itemMasterService.itemUpdate(this.itemMaster,this.router,this.notificationService);
    this.notificationService.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    }


    keyPressPCB(event: any) {
      const pattern = /[0-9.]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    
 onCancel(){
     this.router.navigate(['/inventory/item-master/list-item-master']);
}
  reset(){
    this.docForm = this.fb.group({
      itemId:[""],
      itemCode: ["", [Validators.required]],
      itemName: ["", [Validators.required]],
      itemDescription: ["", [Validators.required]],
      blno: ["", [Validators.required]],
      itemType: ["", [Validators.required]],
      itemCategory: ["", [Validators.required]],
      saleable: [""],
      purchaseable: [""],
      purchaseReq:[""],
      costingMethod:[""],
      costPrice:[""],
      warranty:[""],
      leadTime:[""],
      purchaseMethod:[""],
      purchaseUom:[""],
      reorderLevel:[""],
      minimumQty:[""],
      maximumQty:[""],
     //GRN
       batchNo:[""], 
       mrp:[""],
       expiryDate:[""],
       manufactureDetails:[""],
      //INVENTORY
       inventoryValuation:[""], 
       issueMethod:[""],
     //Vendor 
          itemMasterDetailBean: this.fb.array([
            this.fb.group({
              itemId:'',
              vendorName:'',
             vendorItemName:'',
             vendorItemCode:'',
             itemCode: '',
             itemName:'',
             vendorminimumQty:'',
             vendorUom:'',
             deliveryLeadTime:'',
             paymentMethod:'',
            })
           ]),
           productDetailBean: this.fb.array([
            this.fb.group({
              itemName:'',            
             itemDescription:'',
            })
           ])
    });
    
  }
  addRow1(){
    this.itemMasterDetailBean= this.itemMasterDetailBean;
    this.dataarray.push(this.itemMasterDetailBean)

  }
  removeRow1(index){
    this.dataarray.splice(index, 1);
  }

  addRow(){

    let itemMasteDtlArray = this.docForm.controls.itemMasterDetailBean as FormArray;
    let arraylen = itemMasteDtlArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      itemId:'',
      vendorName:'',
         vendorItemName:'',
         vendorItemCode:'',
         itemCode: '',
         itemName:'',
         vendorminimumQty:'',
         vendorUom:'',
         deliveryLeadTime:'',
         paymentMethod:'',
    })
    itemMasteDtlArray.insert(arraylen,newUsergroup);
  }
 
  removeRow(index){

    let itemMasteDtlArray = this.docForm.controls.itemMasterDetailBean as FormArray;
    itemMasteDtlArray.removeAt(index);
  }
  addRow2(){

    let productDetailBeanArray = this.docForm.controls.productDetailBean as FormArray;
    let arraylen = productDetailBeanArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      
         itemName:[""],            
         itemDescription:[""],
      
    })
    productDetailBeanArray.insert(arraylen,newUsergroup);
  }
 
  removeRow2(index){

    let productDetailBeanArray = this.docForm.controls.productDetailBean as FormArray;
    productDetailBeanArray.removeAt(index);
  }

  keyPressNumber(event: any) {
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
   }
  }

  keyPressNumberDouble(event: any) {
  const pattern = /[0-9.]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
    }
  }

}

