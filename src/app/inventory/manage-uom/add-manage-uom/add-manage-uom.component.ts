import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ManageUomService } from '../manage-uom.service';
import { UomMaster} from '../uom-master.model';
import { UomMasterResultBean } from '../uom-master-result-bean';

@Component({
  selector: 'app-add-manage-uom',
  templateUrl: './add-manage-uom.component.html',
  styleUrls: ['./add-manage-uom.component.sass']
})
export class AddManageUomComponent implements OnInit {


  docForm: FormGroup;
  uomMaster: UomMaster;
  uomCategoryList:[];
  requestId: number;
  edit:boolean=false;
  constructor(private fb: FormBuilder,public router:Router,private snackBar: MatSnackBar,
    private manageUomService: ManageUomService,public route: ActivatedRoute,private httpService: HttpServiceService) {

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      unitMeasure: ["", [Validators.required]],
      uomCategory: ["", [Validators.required]],
      description:[""],
      ID:[""],
      id:[""]
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;



      }
     });
    this.httpService.get<UomMasterResultBean>(this.manageUomService.getUomCategory).subscribe(
      (data) => {
        this.uomCategoryList = data.uomCategoryList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  update(){

    this.docForm.patchValue({
      'id': this.requestId,
   })

    this.uomMaster = this.docForm.value;
    this.manageUomService.uomUpdate(this.uomMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/inventory/manage-UOM/list-uomManage']);

  }

  onSubmit(){
    this.uomMaster = this.docForm.value;
    this.manageUomService.addUomManage(this.uomMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/inventory/manage-UOM/list-uomManage']);
  }

  fetchDetails(id: any): void {
    this.httpService.get(this.manageUomService.editUom+"?manageUom="+id).subscribe((res: any)=> {
      console.log(id);

      this.docForm.patchValue({
        'unitMeasure': res.uomBean.unitMeasure,
        'uomCategory': res.uomBean.uomCategory,
        'description': res.uomBean.description,


     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  onCancel(){
    this.router.navigate(['/inventory/manage-UOM/list-uomManage']);
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
