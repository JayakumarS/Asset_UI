import { formatDate } from "@angular/common";
export class DesignationMaster {
  id: number;
  fullName: string;
  emailId: string;
  contactNumber: string;
  companyName: any;
  Success:boolean;
  isactiveForList: string;
  companyId:any;
  branchId:any;
  
  constructor(designationMaster) {
    {
      this.id = designationMaster.id ||"";
      this.fullName = designationMaster.fullName || "";
      this.emailId = designationMaster.emailId || "";
      this.contactNumber = designationMaster.contactNumber || "";
      this.companyName = designationMaster.companyName || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
