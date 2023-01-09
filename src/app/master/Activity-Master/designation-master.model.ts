import { formatDate } from "@angular/common";
export class DesignationMaster {
  id: number;
  activtyid: string;
  activtyname: string;
  Description: string;
  active: any;
  Success:boolean;
  isactiveForList: string;

  
  constructor(designationMaster) {
    {
      this.id = designationMaster.id ||"";
      this.activtyid = designationMaster.activtyid || "";
      this.activtyname = designationMaster.activtyname || "";
      this.Description = designationMaster.Description || "";
      this.active = designationMaster.active || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
