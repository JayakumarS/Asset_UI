import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Branch } from './branch-model';
import { BranchResultBean } from './branch-resultbean';

@Injectable({
  providedIn: 'root'
})
export class BranchService extends UnsubscribeOnDestroyAdapter{
  
  isTblLoading = true;
  dialogData: Branch;
  dataChange: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>(
    []
  );
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService) {
    super();
   }

  private getScheduleActivity = `${this.serverUrl.apiServerAddress}api/auth/app/auditableAsset/getList`;



  get data(): Branch[] {
    return this.dataChange.value;
  }

  getAllList(object){
    console.log(object);
    this.subs.sink = this.httpService.post<BranchResultBean>(this.getScheduleActivity,object).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.branchDetails);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }



}
