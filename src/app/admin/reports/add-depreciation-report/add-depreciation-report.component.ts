import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ReportsService } from '../reports.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-depreciation-report',
  templateUrl: './add-depreciation-report.component.html',
  styleUrls: ['./add-depreciation-report.component.sass']
})
export class AddDepreciationReportComponent implements OnInit {


  docForm: FormGroup;
  page: number = 1;
  depreciationList = [];
  assetcategoryList = [];
  locationDdList: [];
  departmentDdList: [];



  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    private httpService: HttpServiceService,
    public reportsService: ReportsService,

) { }

  ngOnInit(): void {

    this.docForm = this.fb.group({
      depreciationMethod: [""],
      date: [""],
      category: [""],
      assetLocation: [""],
      department: [""],
      search: [""],
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

  onTableDataChange(event: any) {
    this.page = event;
  }

  searchData()
  {
    // this.reportscategory=this.docForm.value;
    this.httpService.get(this.reportsService.depreciationSerach+"?depreciation=" +this.docForm.controls.asset.value ).subscribe((res: any) => {
      console.log(res);
      // this.loList=res.assetList;
    },
    (err: HttpErrorResponse) => {
    }
  );
  }

  reset()
  {
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
