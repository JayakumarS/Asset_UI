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

  private getBranchtList = `${this.serverUrl.apiServerAddress}api/auth/app/branch/getBranchtList`;
  private saveBranch = `${this.serverUrl.apiServerAddress}api/auth/app/branch/save`;
  public editBranchMaster = `${this.serverUrl.apiServerAddress}api/auth/app/branch/edit`;



  get data(): Branch[] {
    return this.dataChange.value;
  }

  getAllList(){
    console.log();
    this.subs.sink = this.httpService.get<BranchResultBean>(this.getBranchtList).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.branchList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

  addBranch(branchMaster: Branch): void {
    this.dialogData = branchMaster;
    this.httpService.post<Branch>(this.saveBranch, branchMaster).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }



}
