export class InventoryReports{
  
    itemId: number;
    itemWise: string;
    availableQty: string;
    orderQty: string;
    workInQty: string;
    categoryName: string | number;
    locationName: string | number;
    openingBalance: string | number;
    itemCode: string | number;
    fromDate: any;
    toDate: any;
    consumedQty: number;
    sold: any;
    price: any;
    assetName: string;
    quantity:string;
    item: string;
    location: string;
    
      constructor(inventoryReport) {
        {
          this.itemWise = inventoryReport.itemWise || "";
          this.availableQty = inventoryReport.availableQty || "";
          this.orderQty = inventoryReport.orderQty || "";
          this.workInQty = inventoryReport.workInQty || "";
          this.assetName = inventoryReport.assetName || "";
          this.quantity = inventoryReport.quantity || "";
        }
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
    
    
    }