import { formatDate } from "@angular/common";
export class StockVerification {
  id: number;
  stockVerificationNo: number;
  organizationName: string;
  location: string;
  date: string;
  verifiedBy: string;
  jobTitle: string;

  constructor(StockVerification) {
    {
      this.id = StockVerification.id || this.getRandomID();
      this.stockVerificationNo = StockVerification.stockVerificationNo || "";
      this.location = StockVerification.location || "";
      this.date = StockVerification.date || "";

      this.verifiedBy = StockVerification.verifiedBy || "";
      this.organizationName = StockVerification.date || "";
      this.jobTitle = StockVerification.jobTitle || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}