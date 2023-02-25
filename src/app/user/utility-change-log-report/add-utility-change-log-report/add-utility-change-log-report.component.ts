import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-utility-change-log-report',
  templateUrl: './add-utility-change-log-report.component.html',
  styleUrls: ['./add-utility-change-log-report.component.sass']
})
export class AddUtilityChangeLogReportComponent implements OnInit {
  docForm: FormGroup;
  userDdList=[];

  constructor(private fb: FormBuilder,
    private httpService: HttpServiceService,
    private commonService: CommonService,
    private tokenStorage: TokenStorageService

    ) 
  
  { this.docForm = this.fb.group({
    date:[""],
    meter:[""],
    assignee:[""],

  })
  }

  ngOnInit(): void {

     // User dropdown
   this.httpService.get<any>(this.commonService.getAdminDropdown+"?companyId="+this.tokenStorage.getCompanyId()).subscribe({
    next: (data) => {
      this.userDdList = data;
    },
    error: (error) => {

    }
  });
  }

}
