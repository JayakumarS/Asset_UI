import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-utility-report',
  templateUrl: './add-utility-report.component.html',
  styleUrls: ['./add-utility-report.component.sass'],
  // Date Related code
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
      display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
      },
  } },CommonService
  ]
})
export class AddUtilityReportComponent implements OnInit {

  docForm: FormGroup;
  locationDdList = [];

  constructor(
    private fb: FormBuilder,
    private cmnService:CommonService,
    private httpService: HttpServiceService,
    private commonService: CommonService,
  )  

  {
    this.docForm = this.fb.group({
      startdate:[""],
      startdateObj:[""],
      enddate:[""],
      enddateObj:[""],
      warning:[""],
      location:[""],
      search:[""],

    })
   }
   getDateString(event,inputFlag,index){
    let cdate = this.cmnService.getDate(event.target.value);
    if(inputFlag=='startdate'){
      this.docForm.patchValue({startdate:cdate});
    }
    else if(inputFlag=='enddate'){
      this.docForm.patchValue({enddate:cdate});
    }
    // else if(inputFlag=='expectedDate'){
    //   this.docForm.patchValue({expectedDate:cdate});
    // }
  }

  ngOnInit(): void {

    // Location dropdown
    this.httpService.get<any>(this.commonService.getLocationDropdown).subscribe({
      next: (data) => {
        this.locationDdList = data;
      },
      error: (error) => {

      }
    });
  }

}
