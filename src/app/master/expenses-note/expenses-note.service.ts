import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { expenese } from './expenses-note.model';
import { ExpensesResultBean } from './expenses-note-result-bean';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesNoteService  extends UnsubscribeOnDestroyAdapter {
  dialogData: expenese;

  Success:boolean;
  UserId: string;
  
  dataChange: BehaviorSubject<expenese[]> = new BehaviorSubject<expenese[]>(
    []
  );
  isTblLoading = true;
  constructor(private httpClient: HttpClient, private serverUrl: serverLocations, private httpService: HttpServiceService,private tokenStorage: TokenStorageService) {
    super();

    
   }
   private save = `${this.serverUrl.apiServerAddress}app/expenses-note/save`;
   private getlist = `${this.serverUrl.apiServerAddress}app/expenses-note/getlist`;
   private get= `${this.serverUrl.apiServerAddress}app/expenses-note/get`;

   get data(): expenese[] {
    return this.dataChange.value;
  }

   saveexpenses(expensesnote,router,notificationService){
    this.dialogData = expensesnote;
    this.httpService.post<any>(this.save, expensesnote).subscribe(data => {
      console.log(data);
      if(data.success=true){
        notificationService.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
        if(window.sessionStorage.getItem("expensesFrom")=="expenses"){
          window.sessionStorage.setItem("expensesFrom","");
          router.navigate(['/master/multiple/allMaster/0']);
        }else if(window.sessionStorage.getItem("expensesFrom")=="normal"){
          window.sessionStorage.setItem("expensesFrom","");
          router.navigate(['/master/expenses/list']);
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
  getexpenseslist(){
    this.UserId=this.tokenStorage.getUserId();
    this.subs.sink = this.httpService.get<ExpensesResultBean>(this.getlist+"?UserId="+this.UserId).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data.expenseslist);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }

 
  getincome(obj: any): Observable<any> {
    return this.httpClient.post<any>(this.get, obj);
  }

}
