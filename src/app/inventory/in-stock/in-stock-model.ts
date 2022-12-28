import { formatDate } from "@angular/common";
export class InStockMaster {
  
    item: number;
    invCategory: string;
    itemCode: string;
    price: string;
    unit: string;
    invDescription: string;
    invUploadFiles: string;
    hsnCode: string;
    isReceivable: any;
    imgUploadUrl: any;
  

  constructor(InStockMaster) {
    {
      this.item = InStockMaster.id || this.getRandomID();
      this.invCategory = InStockMaster.activityType || "";
      this.itemCode = InStockMaster.location || "";
      this.price = InStockMaster.userGroup || "";
      this.unit = InStockMaster.description || "";
      this.invDescription = InStockMaster.assignee || "";
      this.invUploadFiles = InStockMaster.attachFiles || "";
      this.hsnCode = InStockMaster.occurs || "";
      this.isReceivable = InStockMaster.startDate || "";
      this.imgUploadUrl = InStockMaster.endDate || ""
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
