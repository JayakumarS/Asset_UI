import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { NotificationService } from 'src/app/core/service/notification.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CompanyLogoService } from '../company-logo.service';
import { CompanyLogo } from '../companyLogo.model';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CommonService } from 'src/app/common-service/common.service';

@Component({
  selector: 'app-list-company-logo',
  templateUrl: './list-company-logo.component.html',
  styleUrls: ['./list-company-logo.component.sass']
})
export class ListCompanyLogoComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  http: any;
  user: string;

  companyLogo: CompanyLogo;
  customerDropDown: [];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private serverUrl: serverLocations,
    private httpService: HttpServiceService,
    public router: Router,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private companyLogoService: CompanyLogoService,
    public tokenStorage: TokenStorageService,
    public commonService: CommonService,



  )
  {
    super(); {}
    this.docForm = this.fb.group({
      companyName : [""],
      companyLogo : [""],
      logoUpload : [""],
      backGroundImg : [""],
      bgUpload : [""]
    });
   }


  ngOnInit(): void {


    this.user = this.tokenStorage.getUsername();


    this.httpService.get<any>(this.commonService.getUserBasedCompanyDropdown + "?userId=" + (this.user)).subscribe({
    next: (data) => {
      this.customerDropDown = data.addressBean;
    },
    error: (error) => {
    }
  });
  }
  reset() {
    this.docForm = this.fb.group({
      companyName : [""],
      companyLogo : [""],
      logoUpload : [""],
      backGroundImg : [""],
      bgUpload : [""]
    });
  }

  onSubmit(){
    if (this.docForm.valid){
      this.companyLogo = this.docForm.value;
      console.log(this.companyLogo);
      this.companyLogoService.addCompany(this.companyLogo, this.notificationService);
    }
    else {
      this.notificationService.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
    }
  }

  getLogoDetails(event) {
    var docfile = event.target.files[0];
    var fileSize = docfile.size;
    console.log(fileSize);
    if (fileSize > 204800){
      this.docForm.patchValue({'logoUpload': ""});
    }else{
    var fileExtension = docfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", docfile);
    frmData.append("fileName", fileExtension);
    frmData.append("fileType", "profileLogo");
    console.log(frmData);

    this.httpService.post<any>(this.companyLogoService.addLogoFiles, frmData).subscribe(data => {
        console.log(data);
        if (data.success){
          this.docForm.patchValue({
            'logoUpload': data.filePath
         });
        }
        else{
          this.notificationService.showNotification(
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
    }
    getBgLogoDetails(event) {
      var docfile = event.target.files[0];
      var fileSize = docfile.size;
      console.log(fileSize);
      if(fileSize > 204800){
        this.docForm.patchValue({'bgUpload': ""});
      }else{
      var fileExtension = docfile.name;
      var frmData: FormData = new FormData();
      frmData.append("file", docfile);
      frmData.append("fileName",fileExtension);
      frmData.append("fileType","bgLogo");

      console.log(frmData);

      this.httpService.post<any>(this.companyLogoService.addBgFiles, frmData).subscribe(data => {
          console.log(data);
          if (data.success){
            this.docForm.patchValue({
              'bgUpload': data.filePath
           });
          }
          else{
            this.notificationService.showNotification(
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
      }
      showNotification(colorName, text, placementFrom, placementAlign) {
        this.snackBar.open(text, " ", {
          duration: 2000,
          verticalPosition: placementFrom,
          horizontalPosition: placementAlign,
          panelClass: colorName,
        });
      }


}
