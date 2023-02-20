export class Branch {
  
    id: any;
    branchId: any;
    branchCode: any;
    branchname: any;
    locationName: any;
    addressOne:any;
    addressOneCountry:any;
    addressOneState:any;
    addressOneCity:any;
    addressOneZipCode:any;
    phoneCode:any;
    telephoneNo:any;
    Success:boolean;
    companyId: any;
    companyName:any;
    userid:string;
    shift:Number;
  
    constructor(branch) {
      {
        this.id = branch.id || this.getRandomID();
        this.branchId = branch.branchId || "";
        this.branchCode = branch.branchCode || "";
        this.branchname = branch.branchname || "";
        this.locationName = branch.locationName || "";
        this.companyName = branch.companyName || "";
        this.shift = branch.shift || "";
        this.userid = branch.userId || "";
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }