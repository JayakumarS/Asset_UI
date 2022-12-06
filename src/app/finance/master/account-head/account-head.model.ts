import { formatDate } from "@angular/common";
export class AccountHeadMaster {
  subGroupAccountCode: string;
  accountHeadName: string;
  accountHeadCode: string;
  description: string;
  grpHeadName: string;
  type: string;
  subGroupAccountName: string;
  grpHd: string;
  currencyCode: string;
  currencyName: string;
  acctHeadStatus: string;
  lAttributeList: Array<object>;
  lAttributes: Array<string>;

  constructor(accountHeadMaster) {
    {
      this.subGroupAccountCode = accountHeadMaster.subGroupAccountCode ;
      this.accountHeadName = accountHeadMaster.accountHeadName ;
      this.accountHeadCode = accountHeadMaster.accountHeadCode || "";
      this.description = accountHeadMaster.description || "";
      this.grpHeadName = accountHeadMaster.grpHeadName || "";
      this.type = accountHeadMaster.type || "";
      this.subGroupAccountName = accountHeadMaster.subGroupAccountName || "";
      this.grpHd = accountHeadMaster.grpHd || "";
      this.currencyCode = accountHeadMaster.currencyCode || "";
      this.acctHeadStatus = accountHeadMaster.acctHeadStatus || "";
      this.lAttributeList = accountHeadMaster.lAttributeList || [];
      this.lAttributes = accountHeadMaster.lAttributes || [];
    }
  }
}
