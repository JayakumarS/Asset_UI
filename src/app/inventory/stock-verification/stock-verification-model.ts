import { formatDate } from "@angular/common";
export class StockVerification {
  [x: string]: any;
  saveStock(stockVerification: StockVerification) {
    throw new Error('Method not implemented.');
  }
  id: number;
  stockVerificationNo: number;
  location: string;
  organizationName: string;
  verifiedBy: string;
  jobTitle: string;
  date: string;
  


  
  constructor(stockVerification) {
    {
      this.id = stockVerification.id || this.getRandomID();
      this.stockVerificationNo = stockVerification.stockVerificationNo || "";
      this.location = stockVerification.location || "";
      this.organizationName = stockVerification.organizationName || "";
      this.date = formatDate(new Date(), "dd-MM-YYYY", "en") || "";
      this.verifiedBy = stockVerification.verifiedBy || "";
      this.jobTitle = stockVerification.jobTitle || "";
     
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
