import { formatDate } from "@angular/common";
export class ExchangeMaster {
 
  id: number;
  exchangeid: string;
  exchangeratecode: string;
  exchangeratecodeobj: string;
  currency: string;
  date: string;
  dateobj: string;
  value: string;

  Success:boolean;
  isactiveForList: string;
  companyId:any;
  branchId:any;
  
  constructor(exchangeMaster) {
    {
      this.id = exchangeMaster.id ||"";
      this.exchangeid = exchangeMaster.exchangeid || "";
      this.exchangeratecode = exchangeMaster.exchangeratecode || "";
      this.currency = exchangeMaster.currency || "";
      this.date = exchangeMaster.date || "";
      this.value = exchangeMaster.value || "";
    
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
