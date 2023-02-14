import { formatDate } from "@angular/common";
export class Authentication {
        id: number;
        Success:boolean;

        companyName:string;
        emailId:string;
        telephoneNo:string;
        website:string;
        country:string;
        address:string;
        contactPerson:string;
        role:number;
        


        
  
  constructor(authentication) {
    {
      this.companyName = authentication.companyName ||"";
      this.emailId = authentication.emailId || "";
      this.telephoneNo = authentication.telephoneNo || "";
      this.website = authentication.website || "";
      this.country = authentication.country || "";
      this.address = authentication.address || "";
      this.contactPerson = authentication.contactPerson || "";
      this.role = authentication.role || "";
    
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
