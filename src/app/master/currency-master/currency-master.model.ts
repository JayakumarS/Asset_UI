import { formatDate } from "@angular/common";
export class CurrencyMaster {
  id: number;
  currencyCode: string;
  currencyName: string;
  companyId:any;
  branchId:any;
  countOfCurrency:any;
  
  constructor(currencyMaster) {
    {
      this.id = currencyMaster.id || this.getRandomID();
      this.currencyCode = currencyMaster.currencyCode || "";
      this.currencyName = currencyMaster.currencyName || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
