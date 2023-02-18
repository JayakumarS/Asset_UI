import { formatDate } from "@angular/common";
export class TaxMaster {
  id: number;
  taxid: string;
  taxname: string;
  taxcode: string;
  taxtype: string;
  taxmethod: string;
  taxpercentage: string;
  taxamount: string;
  active: any;
  Success:boolean;
  isactiveForList: string;
  companyId:any;
  branchId:any;
  
  constructor(taxMaster) {
    {
      this.id = taxMaster.id ||"";
      this.taxid = taxMaster.taxid || "";
      this.taxname = taxMaster.taxname || "";
      this.taxtype = taxMaster.taxtype || "";
      this.taxcode = taxMaster.taxcode || "";
      this.taxmethod = taxMaster.taxmethod || "";
      this.taxpercentage = taxMaster.taxpercentage || "";
      this.taxamount = taxMaster.taxamount || "";
      this.active = taxMaster.active || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
