import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-popup',
  templateUrl: './employee-popup.component.html',
  styleUrls: ['./employee-popup.component.sass']
})
export class EmployeePopupComponent implements OnInit {

  
  matdialog: any;
  dialogRef: any;

  constructor( private router:Router,
    public route: ActivatedRoute,) { 
  }
  ngOnInit(): void {
    
  }

 saveanotherasset(){
 this.router.navigate(['/admin/asset/addAsset']);
  }
  
scheduleactivity(){
  this.router.navigate(['/admin/scheduler/list-schedule-activity']);
}

gotodashboard(){
  this.router.navigate(['/asset/assetMaster/listAssetMaster']);

}



}
