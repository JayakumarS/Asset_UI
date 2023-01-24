import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AssetRequisitionService } from '../../asset-requisition/asset-requisition.service';
import { TransferAssetService } from '../transfer-asset.service';

@Component({
  selector: 'app-view-transfer-asset',
  templateUrl: './view-transfer-asset.component.html',
  styleUrls: ['./view-transfer-asset.component.sass']
})
export class ViewTransferAssetComponent implements OnInit {
  requestId: any;
  transferDetails:any=[];
  transferDetails2:any=[];
  detailValue=[];
  constructor(private fb: FormBuilder,
    public router: Router,
    private notificationService: NotificationService,
    public transferAssetService: TransferAssetService,
    private httpService: HttpServiceService,
    public route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private token: TokenStorageService,
    private assetRequisitionService :AssetRequisitionService,
    private serverUrl: serverLocations) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
    
       this.fetchData(this.requestId) ;
    
      }
     });
  }
  accurredDepreciationPopUp(row) {

    console.log(row.tab.textLabel);
  }

  exitCall(){
    this.router.navigate(['/asset/assetTransfer/listtransfer']);
  }

  fetchData(id){
    this.httpService.get(this.transferAssetService.editTransfer+"?transfer="+id).subscribe((res: any)=> {
      console.log(res);
      this.transferDetails2=res.transferBean;
        this.getRequestDetails(res.transferBean.requisitionNo);
      },
      (err: HttpErrorResponse) => {
      
      }
    );
  }

  getRequestDetails(data:any){
    this.httpService.get<any>(this.transferAssetService.getRequestDetails + "?requestId=" + data).subscribe(
      (data5) => {
        console.log(data5);
        this.transferDetails=data5.transferBean;
        this.detailValue=data5.transferBean.addAssetDetail;

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
}
