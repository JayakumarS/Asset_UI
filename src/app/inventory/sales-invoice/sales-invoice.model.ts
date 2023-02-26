import { formatDate } from "@angular/common";
export class SalesInvoice {
  [x: string]: any;
  id: number;
  locationCode: number;
  cslLocationCode: number;
  locationName: string;
  country: string;
  active: boolean;
  branchId: any;
  company: any;
  customerName: any;
  currencyName: string;
  salesInvoiceNo: any;

  // company:string;
  // companyName:string;
  constructor(salesInvoice) {
    {
      this.id = salesInvoice.id || this.getRandomID();
      this.locationCode = salesInvoice.locationCode || "";
      this.locationName = salesInvoice.locationName || "";
      this.country = salesInvoice.country || "";
      this.company = salesInvoice.company || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      // tslint:disable-next-line:no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
