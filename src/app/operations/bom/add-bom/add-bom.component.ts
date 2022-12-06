import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BomModel } from '../bom.model';
import { BomService } from '../bom.service';
import { BomResultBean } from '../bom-result-bean';
import { serverLocations } from 'src/app/auth/serverLocations';

@Component({
  selector: 'app-add-bom',
  templateUrl: './add-bom.component.html',
  styleUrls: ['./add-bom.component.sass']
})
export class AddBomComponent implements OnInit {

  docForm: FormGroup;
  bomModel: BomModel;
  hide3 = true;
  agree3 = false;
  dataarray = [];
  cusMasterData = [];
  salesEntryData = [];
  workOrderList = [];
  uomList = [];
  bomDtlData = {
    itemId: '',
    uomId: '',
    quantity: '',
    availability: ''
  };
  requestId: number;
  edit: boolean=false;

  constructor(private fb: FormBuilder, public router: Router,
     private bomService: BomService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private snackBar:MatSnackBar,private serverUrl:serverLocations) { 
    this.docForm = this.fb.group({
      bomNo: ["", [Validators.required]],
      workorderNo: ["", [Validators.required]],
      
    });
  }
 

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
    else{
      this.getWorkOrderNumber();    }
     });
    this.dataarray.push(this.bomDtlData)
    this.cusMasterData.push(this.docForm);
    this.cusMasterData.push(this.dataarray);

    this.httpService.get<BomResultBean>(this.bomService.workOrderNoList).subscribe(
      (data) => {
        this.workOrderList = data.workOrderNoList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<BomResultBean>(this.bomService.uomList).subscribe(
      (data) => {
        console.log(data);
        this.uomList = data.uomList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  onSubmit() {
    this.bomModel = this.docForm.value;
    console.log(this.bomModel);
    this.bomModel.billOfMaterialDtlObjBean = this.dataarray;
    this.bomService.save(this.bomModel);

    this.showNotification(
      "snackbar-success",
      "Record Added!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/operations/billOfMeterial/listBom']);
  }

  fetchDetails(bomNo: any): void {
    this.httpService.get(this.bomService.editBillOfMaterial+"?billOfMaterial="+bomNo).subscribe((res: any)=> {
      console.log(bomNo);

      this.docForm.patchValue({
        'bomNo': res.billOfMaterialHdrObjBean.bomNo,
        'workorderNo': res.billOfMaterialHdrObjBean.workorderNo,

     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){
    this.bomModel = this.docForm.value;
    this.bomService.billOfMaterialUpdate(this.bomModel);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/operations/billOfMeterial/listBom']);

    
  }

  addRow(){
    this.bomDtlData= this.bomDtlData;
    this.dataarray.push(this.bomDtlData)

  }
  removeRow(index){
    this.dataarray.splice(index, 1);
  }

 onCancel(){
     this.router.navigate(['/operations/billOfMeterial/listBom']);
}
  reset(){
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getWorkOrderNumber(){
        this.httpService.get<BomResultBean>(this.bomService.workOrderNumber).subscribe(
          (data) => {
            if(data){
            this.docForm.patchValue({
                    'bomNo': data.bomNumber
                });

            }
          },
          (error: HttpErrorResponse) => {
          }
        );
  }

}
