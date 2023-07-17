export class UserMaster {
  id: string;
  currencyCode: string;
  currencyName: string;
  userId: number;
  fullName: string ;
  emailId: string;
  contNumber: string;
  role: string;
  department: number;
  repmanager: string;
  language: string;
  location: string;
  otp: any;
  userLocation: any;
  accountStatus: string;
  active: any
  companytext:any
  constructor(userMaster) {
    {
      this.id = userMaster.id || this.getRandomID();
      this.userId = userMaster.userId || "";
      this.fullName = userMaster.fullName || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      // tslint:disable-next-line:no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
