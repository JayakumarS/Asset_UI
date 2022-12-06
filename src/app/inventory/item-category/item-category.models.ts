import { formatDate } from "@angular/common";
export class ItemCategory {
  id: number;
  categoryName: string;
  parentTypeName: string;
  categoryTypeName: string;
  itemCategoryId:any;
     parentCategory: any;
     salesTaxes: any;
      purchaseTaxes: any;
      asserAccount: any;
      deptAccount: any;
      AccuDept:any;
      gender:any;
      incomingQty:any;
      propertyName:any;
      propertyType:any;
      length:any;
      isMandantory:any;
      batchNO:any;
      expiryDate:any;
      mrp:any;
      manufactureDetails:any;
 
  constructor(itemCategory) {
    {
      this.itemCategoryId = itemCategory.itemCategoryId || "";
      this.categoryName = itemCategory.categoryName || "";
      this.parentTypeName = itemCategory.parentTypeName || "";
      this.parentTypeName = itemCategory.parentTypeName || "";
    
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
