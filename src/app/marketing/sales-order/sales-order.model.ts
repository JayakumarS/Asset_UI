import { formatDate } from "@angular/common";
export class SalesOrder {
  id: number;
  customer: string;
  validFrom: string;
  validTo: string;
  currency: string;
  deliveryDate: string;
  countValue: string;
  
  constructor(salesOrder) {
    {
      this.id = salesOrder.id || this.getRandomID();
      this.customer = salesOrder.customer || "";
      this.validFrom = salesOrder.validFrom || "";
      this.validTo = salesOrder.validTo || "";
      this.currency = salesOrder.currency || "";
      this.deliveryDate = salesOrder.deliveryDate || "";
      this.countValue = salesOrder.countValue || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
