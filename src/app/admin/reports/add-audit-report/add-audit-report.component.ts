import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common-service/common.service';

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
}
