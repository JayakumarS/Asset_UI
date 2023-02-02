import { formatDate } from "@angular/common";
import * as internal from "stream";
export class DiscardAsset {
        id: number;
        Success:boolean;



        assetId: string;
        assetCode: string;
        assetName: string;
        soldValue:string;
        purchasePrice:string;
        priceDifference:string;
        reason:string;
        discardDateobj:string;
        discardDate:string;
        vendorName:string;
        others:string;
        remarks:string;
        taxGroup:string;
        uploadFile:string;
        location:number;
        moveTo:number;

  constructor(discardAsset) {
    {
      this.assetId = discardAsset.assetId ||"";
      this.assetCode = discardAsset.assetCode ||"";
      this.assetName = discardAsset.assetName || "";
      this.soldValue = discardAsset.soldValue || "";
      this.purchasePrice = discardAsset.purchasePrice || "";
      this.reason = discardAsset.reason || "";
      this.discardDateobj = discardAsset.discardDateobj || "";
      this.discardDate = discardAsset.discardDate || "";
      this.vendorName = discardAsset.vendorName || "";
      this.others = discardAsset.others || "";
      this.remarks = discardAsset.remarks || "";
      this.taxGroup = discardAsset.taxGroup || "";
      this.uploadFile = discardAsset.uploadFile || "";
      this.location = discardAsset.location || "";
      this.moveTo = discardAsset.moveTo || "";
      
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
