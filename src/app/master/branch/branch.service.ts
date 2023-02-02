import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Branch } from './branch-model';
import { BranchResultBean } from './branch-resultbean';

@Injectable({
  providedIn: 'root'
})
export class BranchService extends UnsubscribeOnDestroyAdapter{
  
  isTblLoading = true;
  dialogData: Branch;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>(
    []
  );
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }

  private getBranchtList = `${this.serverUrl.apiServerAddress}api/auth/app/branch/getBranchtList`;
  private saveBranch = `${this.serverUrl.apiServerAddress}api/auth/app/branch/save`;
  public editBranchMaster = `${this.serverUrl.apiServerAddress}api/auth/app/branch/edit`;
  public updateBranchMaster = `${this.serverUrl.apiServerAddress}api/auth/app/branch/update`;
  private deleteBranch = `${this.serverUrl.apiServerAddress}api/auth/app/branch/delete`;
  public userBasedBranchDDList = `${this.serverUrl.apiServerAddress}api/auth/app/branch/userBasedBranchDDList`;



  get data(): Branch[] {
    return this.dataChange.value;
  }

  getAllList(){
    console.log();
    this.UserId=this.tokenStorage.getUserId();
    this.subs.sink = this.httpService.get<BranchResultBean>(this.getBranchtList+"?UserId="+this.UserId).subscribe(
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

  addBranch(branchMaster,router,notificationService) {
    this.dialogData = branchMaster;
    this.httpService.post<any>(this.saveBranch, branchMaster).subscribe(data => {
      console.log(data);
      if(data.success){
        console.log("Branch value is "+this.tokenStorage.getBranchId());
        if(this.tokenStorage.getBranchId()==null){
          this.tokenStorage.saveBranchId(data.branchId);
          alert(this.tokenStorage.getBranchId());
        }
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/Branch/listBranch']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Updated!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }

  branchUpdate(branch: Branch): void {
    this.dialogData = branch;
    this.httpService.post<Branch>(this.updateBranchMaster, branch).subscribe(data => {
      console.log(data);
      //this.dialogData = employees;
      },
      (err: HttpErrorResponse) => {
        
    });
  }

  DeleteBranch(branchId: any,router,notificationService): void {
    this.httpService.get<Branch>(this.deleteBranch+"?branchId="+branchId).subscribe(data => {
      console.log(branchId);
      if(data.Success == true){
        notificationService.showNotification(
          "snackbar-success",
          "Deleted Record Successfully...!!!",
          "bottom",
          "center"
        );
        router.navigate(['/master/Branch/listBranch']);
      }
      else if(data.Success == false){
        notificationService.showNotification(
          "snackbar-danger",
          "Not Deleted Successfully...!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }



}
