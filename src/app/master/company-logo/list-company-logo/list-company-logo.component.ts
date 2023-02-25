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
export class ListCompanyLogoComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  http: any;
  user: string;
  private acceptImageTypes = ["image/jpg", "image/png", "image/jpeg"]
  companyLogo: CompanyLogo;
  customerDropDown: [];
  imgLogoUploadPathUrl: any;
  imgbgUploadPathUrl: any;

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



  ) {
    super(); { }
    this.docForm = this.fb.group({
      companyId: [""],
      companyLogo: [""],
      logoUpload: [""],
      backGroundImg: [""],
      bgUpload: [""],
      loginedUser: this.tokenStorage.getUserId(),

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
      companyId: [""],
      companyLogo: [""],
      logoUpload: [""],
      backGroundImg: [""],
      bgUpload: [""]
    });
  }

  onSubmit() {
    if (this.docForm.valid) {
      this.companyLogo = this.docForm.value;
      console.log(this.companyLogo);
      this.companyLogoService.addCompany(this.companyLogo, this.notificationService);


    } else {
      this.notificationService.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right"
      );

    }

  }

  onCancel() {
    this.router.navigate(['/admin/dashboard/main']);
  }


  //FOR IMAGE UPLOAD
  onSelectCompanyLogoImage(event) {
    var imgfile = event.target.files[0];
    if (!this.acceptImageTypes.includes(imgfile.type)) {
      this.showNotification(
        "snackbar-danger",
        "Invalid Image type",
        "top",
        "right"
      );
      return;
    }
    if (imgfile.size > 2000000) {
      this.showNotification(
        "snackbar-danger",
        "Please upload valid image with less than 2mb",
        "top",
        "right"
      );
      return;
    }

    var fileExtension = imgfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", imgfile);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "CompanyLogoImg");

    this.httpService.post<any>(this.commonService.uploadFileUrl, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            this.docForm.patchValue({
              'logoUpload': data.filePath
            })
            this.imgLogoUploadPathUrl = data.filePath;

          }
        } else {
          this.showNotification(
            "snackbar-danger",
            "Failed to upload Image",
            "top",
            "right"
          );
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload Image",
          "top",
          "right"
        );
      }
    });
  }

  //FOR IMAGE UPLOAD 
  onSelectCompanyBackgroundImage(event) {
    var imgfile = event.target.files[0];
    if (!this.acceptImageTypes.includes(imgfile.type)) {
      this.showNotification(
        "snackbar-danger",
        "Invalid Image type",
        "top",
        "right"
      );
      return;
    }
    if (imgfile.size > 2000000) {
      this.showNotification(
        "snackbar-danger",
        "Please upload valid image with less than 2mb",
        "top",
        "right"
      );
      return;
    }

    var fileExtension = imgfile.name;
    var frmData: FormData = new FormData();
    frmData.append("file", imgfile);
    frmData.append("fileName", fileExtension);
    frmData.append("folderName", "CompanyBackgroundImg");

    this.httpService.post<any>(this.commonService.uploadFileUrl, frmData).subscribe({
      next: (data) => {
        if (data.success) {
          if (data.filePath != undefined && data.filePath != null && data.filePath != '') {
            this.docForm.patchValue({
              'bgUpload': data.filePath
            })
            this.imgbgUploadPathUrl = data.filePath;
          }
        } else {
          this.showNotification(
            "snackbar-danger",
            "Failed to upload Image",
            "top",
            "right"
          );
        }
      },
      error: (error) => {
        this.showNotification(
          "snackbar-danger",
          "Failed to upload Image",
          "top",
          "right"
        );
      }
    });
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
