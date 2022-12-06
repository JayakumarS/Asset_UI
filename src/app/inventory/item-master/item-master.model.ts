export class ItemMaster {
  id: number;
  itemId: number;
  itemCode: string;
  itemName: string;
  itemDescription: string;
  itemType: number;
  itemCategory:number;
  saleable: string;
  purchaseable: string;
  
  constructor(itemMaster) {
    {
      this.id = itemMaster.id || this.getRandomID();
      this.itemId = itemMaster.itemId || "";
      this.itemCode = itemMaster.itemCode || "";     
      this.itemName = itemMaster.itemName || "";
      this.itemDescription = itemMaster.itemDescription || "";
      this.itemType = itemMaster.itemType || "";
      this.itemCategory = itemMaster.itemCategory || "";
      this.saleable = itemMaster.saleable || "";
      this.purchaseable = itemMaster.purchaseable || "";
      
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
