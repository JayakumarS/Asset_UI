export class ItemMaster {
  id: number;
  itemId: number;
  itemCode: string;
  blno: string;
  location: string;
  itemName: string;
  itemDescription: string;
  itemType1: string;
  itemCategory1:string;
  saleable: string;
  purchaseable: string;
  itemType:string;
  itemCategory:string;
  purchaseMethod:number;
  purchaseUom:string;
  purchaseReq:number;
  minimumQty:number;
  maximumQty:number;
  reorderLevel:string;
  costingMethod:number;
  costPrice:number;
  warranty:number;
  leadTime:number;
 
  inventoryValuation:number;
   issueMethod:number;

  itemMasterDetailBean: any;
  dataArray: any[];
  
  batchNo:boolean;
  expiryDate:boolean;
  mrp:boolean;
  manufactureDetails:string;
  Success:boolean;
  
  constructor(itemMaster) {
    {
      this.id = itemMaster.id || this.getRandomID();
      this.itemId = itemMaster.itemId || "";
      this.itemCode = itemMaster.itemCode || "";     
      this.itemName = itemMaster.itemName || "";
      this.itemDescription = itemMaster.itemDescription || "";
      this.blno = itemMaster.blno || "";


      this.itemType = itemMaster.itemType || "";
      this.itemCategory = itemMaster.itemCategory || "";



      this.itemType1 = itemMaster.itemType1 || "";
      this.itemCategory1 = itemMaster.itemCategory1 || "";
      this.saleable = itemMaster.saleable || "";
      this.purchaseable = itemMaster.purchaseable || "";

      this.purchaseMethod = itemMaster.purchaseMethod || "";
      this.purchaseUom = itemMaster.purchaseUom || "";     
      this.purchaseReq = itemMaster.purchaseReq || "";
      this.minimumQty = itemMaster.minimumQty || "";
      this.maximumQty = itemMaster.maximumQty || "";
      this.reorderLevel = itemMaster.reorderLevel || "";
     
      this.batchNo = itemMaster.batchNo || "";
      this.expiryDate = itemMaster.expiryDate || "";
      this.mrp = itemMaster.mrp || "";
      this.manufactureDetails = itemMaster.manufactureDetails || "";

      this.inventoryValuation = itemMaster.inventoryValuation || "";
      this.issueMethod = itemMaster.issueMethod || "";
      this.Success = itemMaster.Success || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
