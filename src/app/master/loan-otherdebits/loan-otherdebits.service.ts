import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Otherdebits } from './loan-otherdebits.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanOtherdebitsService extends UnsubscribeOnDestroyAdapter{

    isTblLoading = true;
    dialogData: Otherdebits;
    Success:boolean;
    UserId: string;
    
    dataChange: BehaviorSubject<Otherdebits[]> = new BehaviorSubject<Otherdebits[]>(
      []
    );
 

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }
   public saveotherdebits = `${this.serverUrl.apiServerAddress}app/otherdebits/save`;
   public editdepMaster = `${this.serverUrl.apiServerAddress}app/otherdebits/editdep`;
   public list = `${this.serverUrl.apiServerAddress}app/otherdebits/listdep`;
   public updatedepMaster = `${this.serverUrl.apiServerAddress}app/otherdebits/updatedep`;
   public deleteotherdebits = `${this.serverUrl.apiServerAddress}app/otherdebits/deletedep`;
   
   public getLoanPropertyList = `${this.serverUrl.apiServerAddress}app/otherdebits/LoanPropertyList`;
   public PropertyDetails = `${this.serverUrl.apiServerAddress}app/otherdebits/getPropertyDetails`;

   
   get data(): Otherdebits[] {
    return this.dataChange.value;
  }
  
  addotherdebits(otherdebits,router,notificationService){
    this.dialogData = otherdebits;
    this.httpService.post<any>(this.saveotherdebits, otherdebits).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );

        if(window.sessionStorage.getItem("loanFrom")=="loan"){
          window.sessionStorage.setItem("loanFrom","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("loanFrom")=="normal"){
          window.sessionStorage.setItem("loanFrom","");
          router.navigate(['/master/loan-otherdebits/list-otherdebits']);
        }

       // router.navigate(['/master/loan-otherdebits/list-otherdebits']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not Added!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }

  getList(){
    this.UserId=this.tokenStorage.getUserId();
    this.subs.sink = this.httpService.get<Otherdebits>(this.list+"?UserId="+this.UserId).subscribe(
      (data:any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.depList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

  getPropertyDetails(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.PropertyDetails, obj);
  }

  editlist(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.editdepMaster, obj);
  }

  updateother(otherdebits,router,notificationService) {
    this.dialogData = otherdebits;
    this.httpService.post<any>(this.updatedepMaster, otherdebits).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );
        if(window.sessionStorage.getItem("loanFrom")=="loan"){
          window.sessionStorage.setItem("loanFrom","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("loanFrom")=="normal"){
          window.sessionStorage.setItem("loanFrom","");
          router.navigate(['/master/loan-otherdebits/list-otherdebits']);
        }
      //router.navigate(['/master/loan-otherdebits/list-otherdebits']);
      }else {
        notificationService.showNotification(
          "snackbar-danger",
          "Not updated!!!",
          "bottom",
          "center"
        );
      }

      },
      (err: HttpErrorResponse) => {
        
    });
  }

  deleteother(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.deleteotherdebits, obj);
  }

}
