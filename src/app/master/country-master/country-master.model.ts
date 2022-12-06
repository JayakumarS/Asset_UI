import { formatDate } from "@angular/common";
export class CountryMaster {
  id: number;
  countryCode: string;
  countryName: string;
  currency: string;
  
  constructor(countryMaster) {
    {
      this.id = countryMaster.id || this.getRandomID();
      this.countryCode = countryMaster.countryCode || "";
      this.countryName = countryMaster.countryName || "";
      this.currency = countryMaster.currency || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
