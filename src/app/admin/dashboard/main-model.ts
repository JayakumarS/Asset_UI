import { formatDate } from "@angular/common";
export class main {
  id: number;
  asset_id: number;
  assetName: string;
  assetCode: string;
  assetLocation: string;
  category: string;
  status: string;

  activityType: any;
  location: any;
  enddate: any;
  startdate: any;
  activityTypeText: any;
  locationText: any;

  //inventory
      item: string;
      invCategory:number;
      itemCode:string;
      price:string;
      unit:string;
      description:string;
      uploadFiles:string;
      hsnCode:string;
      isReceivable: string;
      Success: boolean;

      assetType: string;
      assetId: string;
      dueDate: string;
  
  constructor(main) {
    {
      this.asset_id = main.asset_id || this.getRandomID();
      this.assetName = main.assetName || "";
      this.assetCode = main.assetCode || "";
      this.assetLocation = main.assetLocation || "";
      this.category = main.category || "";
      this.status = main.status || "";
      //inventory
      this.id = main.id || this.getRandomID();
      this.item = main.item || "";
      this.invCategory = main.invCategory || "";
      this.itemCode = main.itemCode || "";
      this.price = main.price || "";
      this.unit = main.unit || "";
      this.description = main.description || "";
      this.uploadFiles = main.uploadFiles || "";
      this.hsnCode = main.hsnCode || "";
      this.isReceivable = main.isReceivable || "";

    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
