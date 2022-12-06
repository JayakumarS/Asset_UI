import { formatDate } from "@angular/common";
export class WorkOrder {
  id: number;
  workorderNo: string;
  workorderDate: string;
  salesOrderNo: string; 
  workOrderDtlObjBean: any;
  constructor(workOrder) {
    {
      this.id = workOrder.id || this.getRandomID();
      this.workorderNo = workOrder.workorderNo || "";
      this.workorderDate = workOrder.date || "";
      this.salesOrderNo = workOrder.customerOrderNo || "";
      
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
