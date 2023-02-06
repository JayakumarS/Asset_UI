import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ReportsService } from '../reports.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Reportscategory } from '../reports-model';


@Component({
  selector: 'app-add-depreciation-report',
  templateUrl: './add-depreciation-report.component.html',
  styleUrls: ['./add-depreciation-report.component.sass']
})
export class AddDepreciationReportComponent implements OnInit {


  docForm: FormGroup;
  page: number = 1;
  depreciationList: any = [];
  assetcategoryList = [];
  locationDdList: [];
  departmentDdList: [];

  reportscategory: Reportscategory;


  constructor(
    private fb: FormBuilder,
    private cmnService: CommonService,
    public commonService: CommonService,
    private httpService: HttpServiceService,
    public reportsService: ReportsService,

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
          // Location dropdown
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    });
      // department dropdown
    this.httpService.get<any>(this.commonService.getDepartmentDropdown).subscribe({
        next: (data) => {
          this.departmentDdList = data;
        },
        error: (error) => {

        }
      });
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



//   searchData(){
//     this.reportscategory = this.docForm.value.depreciationMethod;
//     // tslint:disable-next-line:max-line-length
//     this.httpService.get(this.reportsService.depreciationSerach  + "?depreciation=" + this.reportscategory ).subscribe((res: any) => {
//       console.log(res);
//       this.depreciationList = res.depreciationList;
//     },
//     (err: HttpErrorResponse) => {
//     }
//   );
// }

searchData(){
  this.reportscategory = this.docForm.value;
  // tslint:disable-next-line:max-line-length
  this.httpService.post(this.reportsService.depreciationSerach, this.reportscategory).subscribe((res: any) => {
    console.log(res);
    this.depreciationList = res.depreciationList;
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
