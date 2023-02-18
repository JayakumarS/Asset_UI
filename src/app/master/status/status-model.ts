import { formatDate } from "@angular/common";
export class StatusMaster {
  id: number;
  statusid: string;
  statusname: string;
  Description: string;
  active: any;
  Success:boolean;
  isactiveForList: string;
  companyId:any;
  branchId:any;
  loginedUser:any;
  constructor(statusMaster) {
    {
      this.id = statusMaster.id ||"";
      this.statusid = statusMaster.statusid || "";
      this.statusname = statusMaster.statusname || "";
      this.Description = statusMaster.Description || "";
      this.active = statusMaster.active || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
