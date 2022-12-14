import { formatDate } from "@angular/common";
export class CountryMaster {
  id: number;
  countryCode: string;
  countryName: string;
  currency: string;

  categoryName: string;
  description: string;
  parentCategory: string;

  assetName: string;
  assetCode: string;
  assetLocation: string;
  category: string;
  status: string;
  
  constructor(countryMaster) {
    {
      this.id = countryMaster.id || this.getRandomID();
      this.assetName = countryMaster.assetName || "";
      this.assetCode = countryMaster.assetCode || "";
      this.assetLocation = countryMaster.assetLocation || "";
      this.category = countryMaster.category || "";
      this.status = countryMaster.status || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
