import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-add-depreciation-report',
  templateUrl: './add-depreciation-report.component.html',
  styleUrls: ['./add-depreciation-report.component.sass']
})
export class AddDepreciationReportComponent implements OnInit {

   
  docForm: FormGroup;
  page: number = 1;

  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
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
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  searchData()
  {

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
