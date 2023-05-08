import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { jewel } from './jewellery.model';
import { JewelleryResultBean } from './jewllery-result-bean';

@Injectable({
  providedIn: 'root'
})
export class JewelleryService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dialogData: jewel;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<jewel[]> = new BehaviorSubject<jewel[]>(
    []
  );
  RoleId: string;
  companyId:String;

  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }

   private save = `${this.serverUrl.apiServerAddress}app/jewellery/save`;
   private getj = `${this.serverUrl.apiServerAddress}app/jewellery/getjewel`;
   private edit= `${this.serverUrl.apiServerAddress}app/jewellery/edit`;
   private update= `${this.serverUrl.apiServerAddress}app/jewellery/updatejewellery`;
   public deletejewellery= `${this.serverUrl.apiServerAddress}app/jewellery/delete`;

   
  get data(): jewel[] {
    return this.dataChange.value;
  }


  getjewellerylist(){
    this.UserId=this.tokenStorage.getUserId();
    this.subs.sink = this.httpService.get<JewelleryResultBean>(this.getj+"?UserId="+this.UserId).subscribe(
      (data:any) => {
        this.isTblLoading = false;
        this.dataChange.next(data.jlist);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );

  }

  // getList(){
  //   this.UserId=this.tokenStorage.getUserId();
  //   this.subs.sink = this.httpService.get<Otherdebits>(this.list+"?UserId="+this.UserId).subscribe(
  //     (data:any) => {
  //       this.isTblLoading = false;
  //       this.dataChange.next(data.depList);
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.isTblLoading = false;
  //       console.log(error.name + " " + error.message);
  //     }
  //   );

  // }

 

  editJewel(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.edit, obj);
  }

  updateJewel(jewel,router,notificationService) {
    this.dialogData = jewel;
    this.httpService.post<any>(this.update, jewel).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Updated Successfully...!!!",
          "bottom",
          "center"
        );
    if(window.sessionStorage.getItem("jewelFrom")=="jewel"){
          window.sessionStorage.setItem("jewelFrom","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("jewelFrom")=="normal"){
          window.sessionStorage.setItem("jewelFrom","");
          router.navigate(['/master/jewellery/list-jewellery-details']);
        } 
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
  




  // savejewellery(jewel,router,notificationService) {
  //   this.dialogData = jewel;
  //   this.httpService.post<any>(this.save,jewel).subscribe(data => {
  //     console.log(data);
  //     if(data.success){
  //       notificationService.showNotification(
  //         "snackbar-success",
  //         "Add Record Successfully...!!!",
  //         "bottom",
  //         "center"
  //       );
  //     }
  //     },
  //     (err: HttpErrorResponse) => {
        
  //   });
  // }
  savejewellery(jewellery,router,notificationService){
    this.dialogData = jewellery;
    this.httpService.post<any>(this.save, jewellery).subscribe(data => {
      console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        if(window.sessionStorage.getItem("jewelFrom")=="jewel"){
          window.sessionStorage.setItem("jewelFrom","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("jewelFrom")=="normal"){
          window.sessionStorage.setItem("jewelFrom","");
          router.navigate(['/master/jewellery/list-jewellery-details']);
        }      }else {
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

 
  // deletejewellery(id: any): Observable<any> {
  //   return this.httpClient.post<any>(this.delete, id);
  // }

}
