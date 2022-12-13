import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TraansferService } from '../transfer-model';
import { transferResultBean } from '../transfer-result-bean';
import { TransferService } from '../transfer.service';


@Component({
  selector: 'app-addtransfer',
  templateUrl: './addtransfer.component.html',
  styleUrls: ['./addtransfer.component.sass']
})
export class AddtransferComponent implements OnInit {
  [x: string]: any;
  transferList:[];
  locationList:[];
  docForm: FormGroup;
  traansferService:TraansferService
  $event: any;
filePath: any;
nonVatFile: any;

  constructor(private fb: FormBuilder,
    public transferservice:TransferService,
    private httpService: HttpServiceService,
    private snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute,) { 

      this.docForm = this.fb.group({
        status: [""],
        department: ["", [Validators.required]],
        location:[""],
        transfer:[""],
        date:[""],
        remarks:[""],
        files:[""],

     
      });
     


    }

    ngOnInit(): void {

      this.httpService.get<transferResultBean>(this.transferservice.transferListUrl).subscribe(
        (data) => {
          this.transferList = data.transferList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      this.route.params.subscribe(params => {
       if(params.id!=undefined && params.id!=0){
        this.requestId = params.id;
        this.edit=true;
        //For User login Editable mode
        this.fetchDetails(this.requestId) ;
 
       }
      });
      this.httpService.get<transferResultBean>(this.transferservice.locationserviceUrl).subscribe(
        (data) => {
          this.locationList = data.locationList;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      
      this.route.params.subscribe(params => {
       if(params.id!=undefined && params.id!=0){
        this.requestId = params.id;
        this.edit=true;
        this.fetchDetails(this.requestId) ;
 
       }
      });


    }
  

 
    onSubmit(){
      this.traansferService = this.docForm.value;
      console.log(this.traansferService)
      this.transferservice.addtransfer(this.traansferService);
      this.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "bottom",
        "center"
      );
      this.router.navigate([]);
    }
  onCancel(){ 
    this.router.navigate(['/admin/dashboard/main']);
  }
  getFileDetails(event) {
    var docfile = event.target.files[0];
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName",fileExtension);
    console.log(frmData);
    
    // var data = this.httpService.postData(this.fileUploadService.addFiles,frmData);
    // console.log(data);
    
    this.httpService.post<any>(this.transferservice.addFiles, frmData).subscribe(data => {
        console.log(data);
        if(data.success){
          this.docForm.patchValue({
            'kycUploadUrl': data.filePath     
           
         })
        }else{
          this.showNotification(
            "snackbar-danger",
            data.message,
            "bottom",
            "center"
          );
        }
        
        },
        (err: HttpErrorResponse) => {
          
      });
  
    }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  

}
