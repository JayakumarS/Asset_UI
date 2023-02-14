import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ReferralCode } from './referral-code.model';

@Injectable({
  providedIn: 'root'
})
export class ReferralCodeService  extends UnsubscribeOnDestroyAdapter{
 
  isTblLoading = true;

  dataChange: BehaviorSubject<ReferralCode[]> = new BehaviorSubject<ReferralCode[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient, private serverUrl:serverLocations, private httpService:HttpServiceService) { 
    super();
  
    }

    public getList = `${this.serverUrl.apiServerAddress}api/auth/app/audit/referralcode/list`;
    public save = `${this.serverUrl.apiServerAddress}api/auth/app/audit/referralcode/save`;
    public edit = `${this.serverUrl.apiServerAddress}api/auth/app/audit/referralcode/edit`;
    public update = `${this.serverUrl.apiServerAddress}api/auth/app/audit/referralcode/update`;
    public deleteReferralCode = `${this.serverUrl.apiServerAddress}api/auth/app/audit/referralcode/delete`;


    get data(): ReferralCode[] {
      return this.dataChange.value;
    }
    getDialogData() {
      return this.dialogData;
    }
    getAllList(userid: String,companyId : String) {
      this.subs.sink = this.httpService.get<any>(this.getList + "?userid=" + userid+"&companyId="+companyId).subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.referralDetails);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
    }

    referralCodeDelete(scheduleid: any): void {
      this.httpService.get(this.deleteReferralCode + "?scheduleid=" + scheduleid).subscribe(data => {
        console.log(scheduleid);
      },
        (err: HttpErrorResponse) => {
          // error code here
        }
      );
    }
}
