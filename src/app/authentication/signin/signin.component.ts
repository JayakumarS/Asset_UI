import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { User } from "src/app/core/models/user";
import { BehaviorSubject,Observable } from 'rxjs';
import { DialogPosition, MatDialog } from "@angular/material/dialog";
import { CompanyMapPopupComponent } from "src/app/admin/dashboard/main/company-map-popup/company-map-popup.component";
import { CompanyLogoResultBean } from "src/app/master/company-logo/companyLogoResultBean";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { serverLocations } from "src/app/auth/serverLocations";
import { AnyARecord } from "dns";
import { ChatComponent } from "src/app/angular-bot/chat/chat.component";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ChatService } from "src/app/angular-bot/chat.service";
import { CommonService } from "src/app/common-service/common.service";
import { SubscriptionAlertComponent } from "src/app/admin/dashboard/main/subscription-alert/subscription-alert.component";
import { MainService } from "src/app/admin/dashboard/main.service";
import { ChangePasswordPopUpComponent } from "src/app/user/change-password-pop-up/change-password-pop-up.component";

declare var webkitSpeechRecognition:any
declare var grecaptcha: any;

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})


export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  userName : string ='';
  result :string;
   userObj = {};
   pwdStatus: any;

  //  [x: string]: any;
   private currentUserSubject: BehaviorSubject<User>;
  private loginInfo: AuthLoginInfo;
  logoList: any;
  path: any;
  bgList: any;
  bgImg: any;
  locationcity: any;
  city:string;
  ipAddress:string;
  speakerOff:boolean=false;
  speakerOn:boolean=true;
// Google Captcha Site key
  siteKey: string = '6LeiApIfAAAAAOBsKqX0U-EQNu3lk3O9LVByiRAA';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
text='';

  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  tempWords!: string;
  
  constructor(
    private http:HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private app: AppService,private chatService:ChatService,
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog,private snackBar: MatSnackBar,
    private httpService: HttpServiceService,
    private serverUrl:serverLocations, private commonService: CommonService,
    public mainService: MainService
  ) {
    super();
  }

  ngOnInit() { 
    this.init()
    this.authService.getLocation().subscribe((response) => {
      console.log(response)
      this.locationcity = response
      this.city= this.locationcity.city  
      });
    fetch('https://jsonip.com/').then (res=>{
      return res.json();
    }).then(data=>{
  console.log (data.ip);
 this.ipAddress=data.ip
    })
    this.authService.historyClearOnLoginPage();
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      emailId: [""],
      cityName:[""],
      recaptchaResponse: [""],

      
    });
    this.httpService.get<CompanyLogoResultBean>(this.authService.companyUrl).subscribe(
      (data: any) => {
        // console.log(data);
        this.logoList = data.companyLogo;
        this.path = this.logoList;
        this.bgList = data.backGroundImg;
        this.bgImg = this.bgList;

        // let pathLength = this.logoList.length;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
 

  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username").setValue("admin@software.com");
    this.authForm.get("password").setValue("admin@123");
  }
  employeeSet() {
    this.authForm.get("username").setValue("employee@software.com");
    this.authForm.get("password").setValue("employee@123");
  }
  clientSet() {
    this.authForm.get("username").setValue("client@software.com");
    this.authForm.get("password").setValue("client@123");
  }
 
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {


      var recaptchaRes = grecaptcha.getResponse();
      if (recaptchaRes.length == 0) {
        this.loading = false;
        this.error = "Please Click on Google Captcha Checkbox and then submit again";
        return;
      }

      this.authForm.value.cityName=this.city;

      this.loginInfo = new AuthLoginInfo(
      this.f.username.value, this.f.password.value,this.f.emailId.value);


      this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {

        if (data) {
              if(data.success){
                  setTimeout(() => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUsername(data.username);
                this.tokenStorage.saveAuthorities(data.roles);
                this.tokenStorage.saveUserId(data.email);

                this.tokenStorage.saveCompanyId(data.userDetails.companyId);
                this.tokenStorage.saveCompanyText(data.userDetails.company);
                this.tokenStorage.saveRoleId(data.userDetails.roleId);
                this.tokenStorage.saveRoleText(data.userDetails.role);
                this.tokenStorage.saveBranchId(data.userDetails.branchId);
                this.tokenStorage.saveCompanies(data.userDetails.companies);
                this.tokenStorage.saveRoles(data.userDetails.roles);
                if(data.userDetails.companyLogo==null || data.userDetails.companyLogo ==undefined){
                  data.userDetails.companyLogo ="logo/assetChekLogo.png";
                  this.tokenStorage.saveCompanyLogo("https://assetchek.com/assets/images/AssetChekLogo.png")
                }else{
                this.tokenStorage.saveCompanyLogo(this.serverUrl.apiServerAddress+"asset_upload/"+data.userDetails.companyLogo);
              }
                this.loginSuccessUserLog();
                // if(data.userDetails.companies.length>0){
                //   this.showPopUp();
                // }
                this.loading = false;
                if(data.userDetails.roleId == 1 || data.userDetails.roleId == 2 || data.userDetails.roleId == 7 || data.userDetails.roleId == 8 ){
                  this.router.navigate(["/admin/dashboard/main"]);
                  if(data.userDetails.roleId == 2 || data.userDetails.roleId == '2'){
                    this.httpService.get<any>(this.mainService.getSubscriptionCheck + "?userId=" + this.tokenStorage.getUserId()).subscribe((res: any) => {
                      if (res.validSubscription) {
            
                        let tempDirection;
                        if (localStorage.getItem("isRtl") === "true") {
                        tempDirection = "rtl";
                         } else {
                        tempDirection = "ltr";
                         }
                          {
                            const dialogRef = this.dialog.open(SubscriptionAlertComponent, {
                              height: "520px",
                              width: "1000px",
                              direction: tempDirection,
                            });
                          }
                      }
                      });
                  
                  
                  }

                  this.httpService.get<any>(this.commonService.getPwdStatus + "?userId=" + this.tokenStorage.getUserId()).subscribe((result: any) => {
                    this.pwdStatus=result.addressBean[0].pwdStatus;
                    if(!this.pwdStatus ){
                      const dialogRef = this.dialog.open(ChangePasswordPopUpComponent, {
                        disableClose: true ,
                        height: "500px",
                        width: "465px",
                    
                      });
                    }
              
                    },
                    (err: HttpErrorResponse) => {
                       // error code here
                    }
                  );
              
                }
                else if(data.userDetails.roleId == 4){
                  this.router.navigate(["/asset/assetMaster/listAssetMaster"]);
                }
                else if (data.userDetails.roleId == 6) {
                  this.router.navigate(["/individual-subscription/add-subscription"]);
              }else if(data.userDetails.roleId == 3){

                this.httpService.get<any>(this.commonService.getCompaniesUrl+"?userId="+this.tokenStorage.getUsername()).subscribe({
                  next: (data) => {
                    if(data.success){
                      this.tokenStorage.saveCompanies(data.companyMasterDetails);
                      sessionStorage.setItem('loginFlag', 'true');
                      this.router.navigate(["/master/company/listCompany"]);
                    }
              
                  },
                  error: (error) => {
              
                  }
                }
                );

                //this.router.navigate(["/master/company/listCompany"]);
              }

              }, 1000);
              }else{
                 this.submitted = false;
                  this.loading = false;
                  this.error = "Invalid Login";
                console.log(data.message);
              }

            } else {
              this.error = "Invalid Login";
            }

      },
        error => {
            this.submitted = false;
            this.loading = false;
            this.error = "Server Down!!!";
            console.log(error);
        }
      );
    }
  } 
  forgottenPassword(){
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      height: "70%",
      width: "50%",
    });
  }

  loginSuccessUserLog() {

    this.httpService.get<any>(this.authService.getSuccessUserLogData+"?city="+this.city+"&ipAddress="+ this.ipAddress).subscribe({
      next: (data) => {
    this.city,this.ipAddress = data;
    },
    error: (error) => {
    }
  });

   }
  //  openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     height: '300px'
  //   });

 
  openChatBot(){
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '300px',
      height: '350px',
      // position: dialogPosition,
      position: { right: '15px',top:'210px',bottom:'200px'},
      data: {
        action: "edit",
      },
      direction: tempDirection,
    });

  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);

  }
  
    showNotification(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }


    startService(){
      this.speakerOff=true;
      this.speakerOn=false;
      this.start();
    }
  
    stopService(){
      this.stop();
      this.speakerOff=false;
      this.speakerOn=true;
    }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
      this.authForm.patchValue({
        'username':this.text
      })
    });
  }

 

  
  wordConcat() {
    this.text = this.text + ' ' + this.tempWords ;
    this.tempWords = '';
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }
  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.addEventListener('result', (e: { results: Iterable<unknown> | ArrayLike<unknown>; }) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }
   
  }
