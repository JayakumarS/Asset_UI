import { formatDate } from "@angular/common";
export class UomMaster {
  id: number;
  unitMeasure: string;
  uomCategory: string;
  description: string;
  uomID:number;
  
  constructor(uomMaster) {
    {
      this.id = uomMaster.id || this.getRandomID();
      this.unitMeasure = uomMaster.unitMeasure || "";
      this.uomCategory = uomMaster.uomCategory || "";
      this.description = uomMaster.description || "";
      this.uomID = uomMaster.uomID || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
