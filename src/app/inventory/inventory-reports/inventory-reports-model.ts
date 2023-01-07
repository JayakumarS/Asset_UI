export class InventoryReports{

  fromDateObj:string;
      toDateObj:string
      item:string
      itemCode:string
      itemWise:string
      itemdescription:string
      location:string
      maxquality:number
      minquality:number
      size:number
      cost:number
      defaultprice:number
      fromDate:string
      toDate:string
  constructor(InventoryReports) {
    {
      this.itemCode = InventoryReports.itemCode || this.getRandomID();
      this.fromDateObj = InventoryReports.fromDateObj || "";
      this.toDateObj = InventoryReports.toDateObj || "";
      this.item = InventoryReports.item || "";
      this.itemWise = InventoryReports.itemWise || "";
      this.itemdescription = InventoryReports.itemdescription || "";
      this.location = InventoryReports.location || "";
      this.maxquality = InventoryReports.maxquality || "";
      this.minquality = InventoryReports.minquality || "";
      this.size = InventoryReports.size || "";
      this.cost = InventoryReports.cost || "";
      this.defaultprice = InventoryReports.defaultprice || "";
      
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
  



}