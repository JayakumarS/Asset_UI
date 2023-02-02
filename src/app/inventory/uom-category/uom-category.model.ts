import { formatDate } from "@angular/common";
export class UomCategory {
  id: number;
  uomID: number;
  uomCode: string;
  company:string;
  branchname:string;
  categoryName: string;
  description: string;
  name:number;
  category:string
  
  constructor(uomCategory) {
    {
      this.id = uomCategory.id || this.getRandomID();
      this.uomID = uomCategory.uomID || "";
      this.company = uomCategory.company || "";
      this.branchname = uomCategory.branchname || "";
      this.categoryName = uomCategory.categoryName || "";
      this.description = uomCategory.description || "";
      this.name=uomCategory.name||""
      this.category=uomCategory.category||""

    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
