import { formatDate } from "@angular/common";
export class UomCategory {
  id: number;
  uomCode: string;
  categoryName: string;
  categoryDesp: string;
  
  constructor(uomCategory) {
    {
      this.id = uomCategory.id || this.getRandomID();
      this.uomCode = uomCategory.uomCode || "";
      this.categoryName = uomCategory.categoryName || "";
      this.categoryDesp = uomCategory.categoryDesp || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
