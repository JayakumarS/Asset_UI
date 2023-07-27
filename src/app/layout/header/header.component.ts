import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";
import { AuthService } from "src/app/auth/auth.service";
import { LanguageService } from "src/app/core/service/language.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AppService } from 'src/app/app.service';
import { NotificationpopComponent } from "src/app/helpdesk/it-support/list-it-support/notificationpop/notificationpop.component";
import { MatDialog } from "@angular/material/dialog";
import { CompanyMapPopupComponent } from "src/app/admin/dashboard/main/company-map-popup/company-map-popup.component";
import { ActivityPopUpComponent } from "src/app/admin/schedule-activity/activity-pop-up/activity-pop-up.component";
import { ChangePasswordPopUpComponent } from "src/app/user/change-password-pop-up/change-password-pop-up.component";
import { ImagePopupComponent } from "src/app/helpdesk/it-support/list-it-support/image-popup/image-popup.component";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { ItSupportresultbean } from "src/app/helpdesk/it-support/it-support-result-bean";
import { HttpErrorResponse } from "@angular/common/http";
import { ManageAuditService } from "src/app/audit/manage-audit/manage-audit.service";
import { CommonService } from "src/app/common-service/common.service";
import { FlowChartPopupComponent } from "src/app/admin/schedule-activity/flow-chart-popup/flow-chart-popup.component";
import { CompanyLogoResultBean } from "src/app/master/company-logo/companyLogoResultBean";
import { serverLocations } from "src/app/auth/serverLocations";
import { CompanyService } from "src/app/master/company/company.service";
import { MainService } from "src/app/admin/dashboard/main.service";
const document: any = window.document;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit {
  public config: any = {};
  userImg: string;
  homePage: string;
  isNavbarCollapsed = true;
  flagvalue;
  countryName;
  langStoreValue: string;
  defaultFlag: string;
  isOpenSidebar: boolean;
  userName: string;
  upload: boolean = false;
  others: boolean = false;
  notify: boolean = false;
  angle: boolean = false;
  //upload:any
  one: any;
  companyName: string;
  roleBasedImgUrl: string;
  companyNameText: any;
  isMultipleCompany: boolean;
  @ViewChild('openModal') openBtn: ElementRef<HTMLElement>;
  imageListCount: any;
  nonImageCount: any;
  companyId: any;
  roleId: any;
  logoList: any;
  path: any;
  bgList: any;
  bgImg: any;
  locationcity: any;
  city: any;
  ipAddress: string;
  ip: any;
  pwdStatus: any;
  userId: any
  daysleft: any
  subcstatus: any
  SubscOver: boolean = false
  trial: boolean = false

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService,
    private app: AppService,
    public token: TokenStorageService,
    public dialog: MatDialog,
    private httpService: HttpServiceService,
    public manageAuditService: ManageAuditService,
    private commonService: CommonService,
    private serverUrl: serverLocations,
    public companyService: CompanyService,
    public mainService: MainService

  ) {
    super();
  }
  listLang = [
    { text: "English", flag: "assets/images/flags/us.jpg", lang: "en" },
    { text: "Spanish", flag: "assets/images/flags/spain.jpg", lang: "es" },
    { text: "German", flag: "assets/images/flags/germany.jpg", lang: "de" },
  ];
  notifications: any[] = [
    {
      message: "Please check your mail",
      time: "14 mins ago",
      icon: "mail",
      color: "nfc-green",
      status: "msg-unread",
    },
    {
      message: "New Employee Added..",
      time: "22 mins ago",
      icon: "person_add",
      color: "nfc-blue",
      status: "msg-read",
    },
    {
      message: "Your leave is approved!! ",
      time: "3 hours ago",
      icon: "event_available",
      color: "nfc-orange",
      status: "msg-read",
    },
    {
      message: "Lets break for lunch...",
      time: "5 hours ago",
      icon: "lunch_dining",
      color: "nfc-blue",
      status: "msg-read",
    },
    {
      message: "Employee report generated",
      time: "14 mins ago",
      icon: "description",
      color: "nfc-green",
      status: "msg-read",
    },
    {
      message: "Please check your mail",
      time: "22 mins ago",
      icon: "mail",
      color: "nfc-red",
      status: "msg-read",
    },
    {
      message: "Salary credited...",
      time: "3 hours ago",
      icon: "paid",
      color: "nfc-purple",
      status: "msg-read",
    },
  ];
  ngOnInit() {

    this.one = "text"
    this.httpService.get<any>(this.commonService.getPwdStatus + "?userId=" + this.token.getUserId()).subscribe((result: any) => {
      this.pwdStatus = result.addressBean[0].pwdStatus;

      if (this.token.getActiveCompanyFlag() == null) {
        if (JSON.parse(this.token.getCompanies()).length > 1) {
          if (this.roleId != "6" && this.pwdStatus) {
            this.isMultipleCompany = true;
            this.showPopUp();
          }
        }
      }
      // if(!this.pwdStatus){
      //   const dialogRef = this.dialog.open(ChangePasswordPopUpComponent, {
      //     disableClose: true ,
      //     height: "500px",
      //     width: "465px",

      //   });
      // }
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
    //Subscription status
    this.httpService.get<any>(this.companyService.getSubscriptionstatus + "?userId=" + this.token.getUserId()).subscribe({
      next: (data) => {
        if (data.subcstatus > 0) {
          this.trial = true
        }
        this.subcstatus = data.subcstatus
        console.log(this.subcstatus);
      },
      error: (error) => {

      }
    }
    );




    this.authService.getLocation().subscribe((response) => {
      console.log(response)
      this.locationcity = response
      this.city = this.locationcity.city
    });
    fetch('https://jsonip.com/').then(res => {
      return res.json();
    }).then(data => {
      console.log(data.ip);
      this.ipAddress = data.ip
    })
    this.config = this.configService.configData;
    const userRole = this.authService.currentUserValue.role;
    this.userImg = this.authService.currentUserValue.img;

    this.userName = this.token.getUsername();
    // if (userRole === "Admin") {
    //   this.homePage = "admin/dashboard/main";
    // } else if (userRole === "Client") {
    //   this.homePage = "client/dashboard";
    // } else if (userRole === "Employee") {
    //   this.homePage = "employee/dashboard";
    // } else {
    //   this.homePage = "admin/dashboard/main";
    // }
    this.companyNameText = this.token.getCompanyText();
    console.log(this.companyNameText);
    this.roleId = this.token.getRoleId();

    this.roleBasedImgUrl = this.token.getRoleText();
    if (this.roleId === "3") {
      this.homePage = "master/company/listCompany";
    } else if (this.roleId === "2") {
      this.homePage = "admin/dashboard/main";
    } else if (this.roleId === "4") {
      window.sessionStorage.setItem("makerLogin", "true");
      this.homePage = "asset/assetMaster/listAssetMaster";
    } else if (this.roleId === "6") {
      window.sessionStorage.setItem("makerLogin", "true");
      this.homePage = "/authentication/signin";
    } else {
      this.homePage = "admin/dashboard/main";
    }

    this.langStoreValue = localStorage.getItem("lang");
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = "assets/images/flags/us.jpg";
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }


    if (JSON.parse(this.token.getCompanies()).length > 1) {
      this.isMultipleCompany = true;
    }

    this.companyId = this.token.getCompanyId();
    if (this.companyId == undefined || this.companyId == null || this.companyId == "null" || this.companyId == "") {
      this.companyId = 0;
    } else {
      this.companyId = parseInt(this.token.getCompanyId());
    }
    this.httpService.get<any>(this.commonService.imageList + "?companyid=" + this.companyId).subscribe({

      next: (data) => {
        this.nonImageCount = data.getlocationList.length;
        console.log(this.nonImageCount)
      },
      error: (error) => {

      }
    }
    );

    this.httpService.get<CompanyLogoResultBean>(this.authService.companyUrl).subscribe(
      (data: any) => {
        // console.log(data);
        this.logoList = data.companyLogo;
        this.path = this.serverUrl.apiServerAddress + "asset_upload/" + this.logoList;
        this.bgList = this.serverUrl.apiServerAddress + "asset_upload/" + data.backGroundImg;
        this.bgImg = this.serverUrl.apiServerAddress + "asset_upload/" + this.bgList;

        // let pathLength = this.logoList.length;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );



    // SUBSCRIPTION DAYS LEFT
    if (this.roleId == "2") {
      this.userId = this.token.getUserId();
      this.httpService.get<any>(this.companyService.getSubcDaysLeft + "?userId=" + this.userId).subscribe({
        next: (data) => {
          if (data.daysleft < 0) {
            this.SubscOver = true
          }
          this.daysleft = data.daysleft
          console.log(this.daysleft);
        },
        error: (error) => {

        }
      }
      );
    }
  }


  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem("theme")) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem("theme"));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem("menuOption")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("menuOption")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "menu_" + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem("choose_logoheader")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("choose_logoheader")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "logo-" + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem("sidebar_status")) {
      if (localStorage.getItem("sidebar_status") === "close") {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      } else {
        this.renderer.removeClass(this.document.body, "side-closed");
        this.renderer.removeClass(this.document.body, "submenu-closed");
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains("side-closed");
    if (hasClass) {
      this.renderer.removeClass(this.document.body, "side-closed");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    } else {
      this.renderer.addClass(this.document.body, "side-closed");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  logout() {
    // this.subs.sink = this.authService.logout().subscribe((res) => {
    //   if (!res.success) {
    //     this.router.navigate(["/authentication/signin"]);
    //   }
    // });
    this.logoutSuccessUserLog();

    this.token.signOut();
    // this.toastr.info("Please Sign in to Continue", "Logout Successful")
    this.app.SetName('');
    localStorage.removeItem("currentUser");
    this.router.navigate(['/authentication/signin']);

  }

  logoutSuccessUserLog() {


    this.httpService.get<any>(this.authService.getSuccessUserLogoutData + "?city=" + this.city + "&ipAddress=" + this.ipAddress).subscribe({
      next: (data) => {
        this.city = data;
      },
      error: (error) => {
      }
    });
  }

  showPaymentPage() {

    this.router.navigate(['/payments/initiatePayment/subscription']);
  }
  notificationpopup() {

    if (this.notificationpopup) {
      this.notify === true
    }
    this.notify === false


    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(NotificationpopComponent, {
      height: "400px",
      width: "270px",



      direction: tempDirection,
    });


  }

  // notify(value:any){
  //   // if(this.nonImageCount===0){
  //   // this.others=true;
  //   // }
  //   // else
  //   // {
  //   //   this.others=false;
  //   // }

  // }

  nonImagePopup() {

    if (this.nonImageCount === 0) {
      this.others = true;
    }
    else {
      this.others = false;
    }

    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(ImagePopupComponent, {
      height: "1000px",
      width: "2000px",



      direction: tempDirection,
    });
  }

  activityPopUp() {
    if (this.activityPopUp) {
      this.angle === true
    } else {
      this.angle === false
    }


    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(ActivityPopUpComponent, {
      // height: "680px",
      width: "30%",
      height: "40%",
    });
  }

  flowChart() {
    const dialogRef = this.dialog.open(FlowChartPopupComponent, {
      // height: "680px",
      // width: "30%",
      // height: "40%",
    });


  }



  showPopUp() {
    this.httpService.get<any>(this.commonService.getCompaniesUrl + "?userId=" + this.token.getUsername()).subscribe({
      next: (data) => {
        if (data.success) {
          this.token.saveCompanies(data.companyMasterDetails);
        }

      },
      error: (error) => {

      }
    }
    );


    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    console.log(JSON.parse(this.token.getCompanies()));
    this.httpService.get<any>(this.mainService.getSubscriptionCheck + "?userId=" + this.token.getUserId()).subscribe((res: any) => {
      if (res.validSubscription) {
        this.router.navigate(["/admin/dashboard/Subscription-alert"]);

      } else {


        const dialogRef = this.dialog.open(CompanyMapPopupComponent, {
          height: "500px",
          width: "800px",
          data: { companies: JSON.parse(this.token.getCompanies()), },
          direction: tempDirection,
          closeOnNavigation: true,
          disableClose: true
        });

        this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
          if (data == 1) [

          ]
        });
      }
    });


  }

  showPopUp1() {
    this.httpService.get<any>(this.commonService.getCompaniesUrl + "?userId=" + this.token.getUsername()).subscribe({
      next: (data) => {
        if (data.success) {
          this.token.saveCompanies(data.companyMasterDetails);
        }

      },
      error: (error) => {

      }
    }
    );


    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    console.log(JSON.parse(this.token.getCompanies()));
    this.httpService.get<any>(this.mainService.getSubscriptionCheck + "?userId=" + this.token.getUserId()).subscribe((res: any) => {
      if (res.validSubscription) {
        this.router.navigate(["/admin/dashboard/Subscription-alert"]);

      } else {


        const dialogRef = this.dialog.open(CompanyMapPopupComponent, {
          height: "500px",
          width: "800px",
          data: { companies: JSON.parse(this.token.getCompanies()), one: this.one },
          direction: tempDirection,
          closeOnNavigation: true,
          disableClose: true
        });

        this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
          if (data == 1) [

          ]
        });
      }
    });


  }

  Subscription() {
    this.router.navigate(["/individual-subscription/add-subscription"]);

  }


  passwordChange() {
    const dialogRef = this.dialog.open(ChangePasswordPopUpComponent, {
      disableClose: true,
      height: "500px",
      width: "465px",

    });
  }
  updatePassword() {

    this.openBtn.nativeElement.click();

  }
}
