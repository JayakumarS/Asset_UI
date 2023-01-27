export class Branch {
  
    id: number;
    branchid: number;
    branchcode: string;
    branchname: string;
    location: string;
    companyname: string;
  
    constructor(branch) {
      {
        this.id = branch.id || this.getRandomID();
        this.branchid = branch.branchid || "";
        this.branchcode = branch.branchcode || "";
        this.branchname = branch.branchname || "";
        this.location = branch.location || "";
        this.companyname = branch.companyname || "";
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }