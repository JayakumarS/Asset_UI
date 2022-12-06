import { formatDate } from "@angular/common";
export class SalesQuote {
  id: number;
  customer: string;
  validFrom: string;
  validTo: string;
  currency: string;
  expectedDate: string;
  countValue: string;
  
  constructor(salesQuote) {
    {
      this.id = salesQuote.id || this.getRandomID();
      this.customer = salesQuote.customer || "";
      this.validFrom = salesQuote.validFrom || "";
      this.validTo = salesQuote.validTo || "";
      this.currency = salesQuote.currency || "";
      this.expectedDate = salesQuote.expectedDate || "";
      this.countValue = salesQuote.countValue || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
