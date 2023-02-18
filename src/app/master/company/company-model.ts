import { formatDate } from "@angular/common";
export class Company {
        id: number;
        Success:boolean;

        companyName:string;
        shortName:string;
        comCountry:string;
        faxNo:string;
        address:string;
        emailId:string;
        telephoneNo:string;
        personIncharge:string;
        active:any;
        companyId:number;
        isactive: boolean;
        userId:string;
  
  constructor(company) {
    {
      this.companyId = company.companyId ||"";
      this.companyName = company.companyName || "";
      this.comCountry = company.comCountry || "";
      this.emailId = company.emailId || "";
      this.telephoneNo = company.telephoneNo || "";


      // this.shortName = company.shortName || "";
      // this.faxNo = company.faxNo || "";
      // this.address = company.address || "";
      // this.personIncharge = company.personIncharge || "";
      // this.isactive = company.isactive || "";
      // this.userId = company.userId || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
