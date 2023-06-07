import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { note } from './notepad-model';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotepadService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  Success:boolean;
  UserId: string;
  dataChange: BehaviorSubject<note[]> = new BehaviorSubject<note[]>(
    []
  );
  RoleId: string;
  companyId:String;
  
  dialogData:any;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();
   }

   public save= `${this.serverUrl.apiServerAddress}app/notepad/save`;
   public getList= `${this.serverUrl.apiServerAddress}app/notepad/getList`;
   public update = `${this.serverUrl.apiServerAddress}app/notepad/update`;
   public delete = `${this.serverUrl.apiServerAddress}app/notepad/delete`;
   public searchList= `${this.serverUrl.apiServerAddress}app/notepad/search`;

   get data(): note[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  saveNote(note,router,notificationService) {
    this.dialogData = note;
    this.httpService.post<any>(this.save, note).subscribe(data => {
      console.log(data);
      if(data.Success){
        notificationService.showNotification(
          "snackbar-success",
          "Note Added Successfully...!!!",
          "bottom",
          "center"
        );
       // router.navigate(['/master/mutualfund/list-fund']);   
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

  getlist(){

    
  }


  updateNote(note,router,notificationService) {
    this.dialogData = note;
    this.httpService.post<any>(this.update, note).subscribe(data => {
      console.log(data);
      if(data.success){
        notificationService.showNotification(
          "snackbar-success",
          "Note Updated Successfully...!!!",
          "bottom",
          "center"
        );
        location.reload()
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

  // DeleteNote(obj: any) {
  //   this.dialogData = note;
  //  this.httpClient.post<any>(this.delete, obj);
  // }


}
