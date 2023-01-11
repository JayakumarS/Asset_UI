import { formatDate } from "@angular/common";
export class Commodity {
  id: number;
  commodityCode: string;
  commodity: string;
  imdgClass: string;
  classification: string;
  hsCode: string;
  imdgcodePage: string;
  blClause: string;
  unNo: string;
  flashPoint: string;
  vendorName: string;
  vendorCountry: number;
  vendorCountryName:String;
  currency: string;
  vendorPhoneNumber: string;
  success: boolean;
  vendorId:number;
  message:string;
  

  
  constructor(commodity) {
    {
      this.id = commodity.id || this.getRandomID();
      this.commodityCode = commodity.commodityCode || "";
      this.commodity = commodity.commodity || "";
      this.imdgClass = commodity.imdgClass || "";
      this.classification = commodity.classification || "";
      this.hsCode = commodity.hsCode || "";
      this.imdgcodePage = commodity.imdgcodePage || "";
      this.blClause = commodity.blClause || "";
      this.unNo = commodity.unNo || "";
      this.flashPoint = commodity.flashPoint || "";
      this.vendorName = commodity.vendorName || "";
      this.vendorCountry = commodity.vendorCountry || "";
      this.vendorCountryName = commodity.vendorCountryName || "";
      this.currency = commodity.currency || "";
      this.vendorPhoneNumber = commodity.vendorPhoneNumber || "";
      this.vendorId = commodity.vendorId || "";

    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
