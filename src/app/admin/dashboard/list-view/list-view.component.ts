import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CountryMaster } from 'src/app/master/country-master/country-master.model';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass']
})
export class ListViewComponent implements OnInit {

 
  // edit: boolean;
  route: any;

  docForm: FormGroup;

  requestId: number;
  edit:boolean=false;
  countryMasterService: CountryMasterService
  countryMaster : CountryMaster;
  asset_id: Number;

  constructor(private fb: FormBuilder,

    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,
    ) { 

      this.docForm = this.fb.group({
        // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
        asset_id: ["", [Validators.required]],
        assetName: [""],
        assetCode:[""],
        assetLocation:[""],
        category:[""],
        status:[""]
      
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
 
  fetchDetails(id: any): void {
    this.httpService.get(this.countryMasterService.editasset+"?countryMaster="+id).subscribe((res: any)=> {
      console.log(id);
      console.log(this.docForm);
      this.countryMaster = res.countryMaster;

      },
      (err: HttpErrorResponse) => {
      }
    );

  }
  

  onCancel(){
    // this.router.navigate(['/master/designation-Master/list-designation']);
  }
}
