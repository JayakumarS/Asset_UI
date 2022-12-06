import { formatDate } from "@angular/common";
export class SalesCallEntry {
  id: number;
  customerType: string;
  customer: string;
  assignTo: string;
  personMet: string;
  visitDate: string;
  salesCallHdrId:number;
  
  constructor(salesCallEntry) {
    {
      this.id = salesCallEntry.id || this.getRandomID();
      this.customerType = salesCallEntry.customerType || "";
      this.customer = salesCallEntry.customer || "";
      this.assignTo = salesCallEntry.assignTo || "";
      this.personMet = salesCallEntry.personMet || "";
      this.visitDate = salesCallEntry.visitDate || "";
      this.salesCallHdrId = salesCallEntry.salesCallHdrId || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
