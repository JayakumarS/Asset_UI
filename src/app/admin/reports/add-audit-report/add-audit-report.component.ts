import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';
import { ReportsService } from '../reports.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-audit-report',
  templateUrl: './add-audit-report.component.html',
  styleUrls: ['./add-audit-report.component.sass']
})
export class AddAuditReportComponent implements OnInit {

  docForm: FormGroup;
  page: number = 1;

  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    private httpService: HttpServiceService,
    public reportsService: ReportsService,
) { }

  ngOnInit(): void {

    this.docForm = this.fb.group({
      date: [""],
      search: [""],
      status: [""],
  });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  searchData()
  {
    // this.reportscategory=this.docForm.value;
    this.httpService.get(this.reportsService.auditSerach+"?audit=" +this.docForm.controls.asset.value ).subscribe((res: any) => {
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

   })
   this.searchData();
  }
}
