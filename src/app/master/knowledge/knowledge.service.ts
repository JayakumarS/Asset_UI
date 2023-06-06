import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { User } from "src/app/core/models/user";
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Profile } from './knowledge.model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService  extends UnsubscribeOnDestroyAdapter{
  
 
  dialogData: any;

  dataChange: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);

  isTblLoading = true;
  currentUserId: any;
  currentEmailId: any;
  get data(): Profile[] {
    return this.dataChange.value;
  }

  

 constructor(private httpClient: HttpClient,public serverURL: serverLocations,public httpService: HttpServiceService,private tokenStorage: TokenStorageService,
 ) {

      super();
}

fileUploadUrl1 = `${this.serverURL.apiServerAddress}api/auth/app/commonServices/uploadFileIndividual`;
UploadFiles = `${this.serverURL.apiServerAddress}api/auth/app/commonServices/save`;
KnowledgeBankList = `${this.serverURL.apiServerAddress}api/auth/app/commonServices/getList`;
public deleteknowledgeUrl = `${this.serverURL.apiServerAddress}api/auth/app/commonServices/deleteknowledge`;



// saveUploadImage(vehicleMaster,router,notificationService){
//   this.dialogData = vehicleMaster;
//   this.httpService.post<any>(this.UploadFiles, vehicleMaster).subscribe(data => {
//     console.log(data);
//     if(data.success){
//       notificationService.showNotification(
//         "snackbar-success",
//         "Add Record Successfully...!!!",
//         "bottom",
//         "center"
//       );
//      router.navigate(['/master/vehicle/list-vehicle']);
//     }else {
//       notificationService.showNotification(
//         "snackbar-danger",
//         "Not Added!!!",
//         "bottom",
//         "center"
//       );
//     }

//     },
//     (err: HttpErrorResponse) => {
      
//   });
// }
// delete

knowledgeDelete(obj: any): Observable<any> {
  return  this.httpClient.post<any>(this.deleteknowledgeUrl, obj);
}


// knowledgeDelete(knowledge: any,router,notificationService): void {
//   this.httpService.get<any>(this.deleteknowledgeUrl+"?knowledge="+knowledge).subscribe(data => {
//     if(data.success == true){
//       notificationService.showNotification(
//         "snackbar-success",
//         "Deleted Record Successfully...!!!",
//         "bottom",
//         "center"
//       );
//     }
//     else if(data.success == false){
//       notificationService.showNotification(
//         "snackbar-danger",
//         "Related Data exist ...!!!",
//         "bottom",
//         "center"
//       );
//     }

//     // this.getAllList();
//     },
//     (err: HttpErrorResponse) => {
//        // error code here
//     }
//   );
  
// }


  //Connection List
  getknowledgebankList(): void {

    this.subs.sink = this.httpService.get<any>(this.KnowledgeBankList).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.knowledgeList);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }


}