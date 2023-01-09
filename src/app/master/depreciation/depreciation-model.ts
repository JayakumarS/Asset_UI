import { formatDate } from "@angular/common";
export class DepreciationMaster {
  
  id:any;
  name: string;
  code: string;
  active: any;
  Success:boolean;
  isactive: string;
  isactiveForList: string;
 

  
  constructor(depreciationMaster) {
    {
     this.name = depreciationMaster.name || "";
      this.code = depreciationMaster.code || "";
      this.active = depreciationMaster.active || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
