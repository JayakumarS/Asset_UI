export class Branch {
  
    id: any;
    branchid: any;
    branchCode: any;
    branchname: any;
    locationName: any;
    companyId: any;
    companyName:any;
  
    constructor(branch) {
      {
        this.id = branch.id || this.getRandomID();
        this.branchid = branch.branchid || "";
        this.branchCode = branch.branchCode || "";
        this.branchname = branch.branchname || "";
        this.locationName = branch.locationName || "";
        this.companyName = branch.companyName || "";
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }