import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ReportsService } from '../reports.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Reportscategory } from '../reports-model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserMasterService } from 'src/app/master/user-master/user-master.service';




@Component({
  selector: 'app-add-depreciation-report',
  templateUrl: './add-depreciation-report.component.html',
  styleUrls: ['./add-depreciation-report.component.sass']
})
export class AddDepreciationReportComponent implements OnInit {


  docForm: FormGroup;
  page: number = 1;
  [x: string]: any;

  depreciationList: any = [];
  assetcategoryList = [];


  reportscategory: Reportscategory;
  searchList = [];
  locationList = [];
  requestId: any;
  route: any;
  departmentList = [];


  constructor(
    private fb: FormBuilder,
    private cmnService: CommonService,
    public commonService: CommonService,
    private httpService: HttpServiceService,
    public reportsService: ReportsService,
    private tokenStorage: TokenStorageService,
    private userMasterService: UserMasterService,



) {

  this.docForm = this.fb.group({
    depreciationMethod: [""],
    date: [""],
    category: [""],
    assetLocation: [""],
    department: [""],
    search: [""],
    categoryId: [""],
    categoryName: [""],
    assetName: [""],
    assetCode: [""],
    departmentName: [""],
    invoiceDate: [""],
    name: [""],
    captitalizationPrice: [""],
    captitalizationDate: [""],
    scrapValue: [""],
    endLife: [""],
    asset_location: [""],
    discardFromDate: [""],

});
 }

  ngOnInit(): void {

    this.docForm = this.fb.group({
      depreciationMethod: [""],
      date: [""],
      category: [""],
      assetLocation: [""],
      department: [""],
      search: [""],
      categoryId: [""],
      categoryName: [""],
      assetName: [""],
      assetCode: [""],
      departmentName: [""],
      invoiceDate: [""],
      name: [""],
      captitalizationPrice: [""],
      captitalizationDate: [""],
      scrapValue: [""],
      endLife: [""],
      asset_location: [""],
      discardFromDate: [""],



  });

    // depreciation dropdown
    this.httpService.get<any>(this.commonService.getdepreciationdropdown).subscribe({
      next: (data) => {
        this.depreciationList = data;
      },
      error: (error) => {

      }
    });

       // assetcategory dropdown
    this.httpService.get<any>(this.commonService.getassetcategorydropdown).subscribe({
        next: (data) => {
          this.assetcategoryList = data;
        },
        error: (error) => {

        }
      });

    // tslint:disable-next-line:max-line-length
    this.httpService.get(this.commonService.getCompanybasedlocationDropdown + "?companyId="  + this.tokenStorage.getCompanyId() + "").subscribe((res: any) => {
        this.locationList = res.addressBean;

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

        // Department Dropdown List
    this.httpService.get<any>(this.userMasterService.departmentListUrl + "?company=" + this.tokenStorage.getCompanyId() + "").subscribe(
      (data) => {
        this.departmentList = data.departmentList;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  }
  getDateString(event, inputFlag){
    let cdate = this.cmnService.getDate(event.target.value);
    if (inputFlag=='date'){
      this.docForm.patchValue({date: cdate});
    }
    else {
    }

  };

  onTableDataChange(event: any) {
    this.page = event;
  }



searchData(){
  this.reportscategory = this.docForm.value;
  // tslint:disable-next-line:max-line-length
  this.httpService.post(this.reportsService.depreciationSerach, this.reportscategory).subscribe((res: any) => {
    console.log(res);
    this.searchList = res.depreciationList;
  },
  (err: HttpErrorResponse) => {
  }
);
}

  reset()
  {
    location.reload();

    this.docForm.patchValue({
      'depreciationMethod' : '',
      'date' : '',
      'category' : '',
      'assetLocation' : '',
      'department' : '',
      'search' : '',

   });
    this.searchData();
  }
}
