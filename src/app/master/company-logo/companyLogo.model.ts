import { formatDate } from "@angular/common";
export class CompanyLogo {
  [x: string]: any;
  id: number;
  locationCode: number;
  cslLocationCode: number;
  locationName: string;
  country: string;
  active: boolean;
  branchId: any;
  company: any;
  customerName: string;
  currencyName: string;
  // company:string;
  // companyName:string;
  constructor(companyLogo) {
    {
      this.id = companyLogo.id || this.getRandomID();
      this.locationCode = companyLogo.locationCode || "";
      this.locationName = companyLogo.locationName || "";
      this.country = companyLogo.country || "";
      this.company = companyLogo.company || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      // tslint:disable-next-line:no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
