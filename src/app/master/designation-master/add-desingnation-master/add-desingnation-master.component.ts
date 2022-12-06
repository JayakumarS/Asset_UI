import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DesignationMaster } from '../designation-master.model';
import { DesignationMasterResultBean } from '../designation-master-result-bean';
import { DesignationMasterService } from '../designation-master.service';


@Component({
  selector: 'app-add-desingnation-master',
  templateUrl: './add-desingnation-master.component.html',
  styleUrls: ['./add-desingnation-master.component.sass']
})
export class AddDesingnationMasterComponent implements OnInit {

  docForm: FormGroup;
  requestId: number;
  edit:boolean=false;
  designationMaster : DesignationMaster;
  constructor(private fb: FormBuilder,
    private designationMasterService : DesignationMasterService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    public route: ActivatedRoute,
    private router:Router) { 

    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      designationName: ["", [Validators.required]],
      desgnCode: [""],
      remarks:[""],
      active:[""]
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
     });
  }

  onSubmit(){
    this.designationMaster = this.docForm.value;
    console.log(this.designationMaster);
    this.designationMasterService.addDesignation(this.designationMaster);
    this.showNotification(
      "snackbar-success",
      "Add Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/designation-Master/list-designation']);
  }

  // Edit
  fetchDetails(desgnCode: any): void {
    this.httpService.get(this.designationMasterService.editDesignationMaster+"?designationMaster="+desgnCode).subscribe((res: any)=> {
      console.log(desgnCode);

      this.docForm.patchValue({
        'designationName': res.designationMasterBean.designationName,
        'remarks': res.designationMasterBean.remarks,
        'desgnCode': res.designationMasterBean.desgnCode,
     })
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

    this.designationMaster = this.docForm.value;
    this.designationMasterService.designationMasterUpdate(this.designationMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/master/designation-Master/list-designation']);

  }

  onCancel(){
    this.router.navigate(['/master/designation-Master/list-designation']);
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

}
