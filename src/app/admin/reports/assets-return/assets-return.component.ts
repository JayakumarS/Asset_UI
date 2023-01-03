import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-assets-return',
  templateUrl: './assets-return.component.html',
  styleUrls: ['./assets-return.component.sass']
})
export class AssetsReturnComponent implements OnInit {
  displayedColumns=[

    "asset_code",
    "asset_name",
    "asset_location",
    "transferred_to",
    "department",
    "allotted_upto",

  ];
  docForm:FormGroup;

  constructor(private fb: FormBuilder,public reportsService:ReportsService,
    private httpService: HttpServiceService,) { }

  ngOnInit(): void {
    this.docForm = this.fb.group({
      allotted_upto:[""],
      department: [""],
       transferred_to:[""],
       asset_code:[""],
       asset_name:[""],
       asset_location:[""],
       enddate:[""],
       startdate:[""],
      
     });
  }

}
