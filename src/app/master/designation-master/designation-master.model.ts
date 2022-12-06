import { formatDate } from "@angular/common";
export class DesignationMaster {
  id: number;
  desgnCode: string;
  designationName: string;
  active: string;

  
  constructor(designationMaster) {
    {
      this.id = designationMaster.id || this.getRandomID();
      this.desgnCode = designationMaster.desgnCode || "";
      this.designationName = designationMaster.designationName || "";
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
