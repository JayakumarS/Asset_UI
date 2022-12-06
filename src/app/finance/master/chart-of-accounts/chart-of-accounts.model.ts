import { formatDate } from "@angular/common";
export class ChartOfAccounts {
  groupHeadId: number;
  groupHeadCode: string;
  groupHeadName: string;
  subGroupAcctCode: string;
  subGroupAcctName: string;
  accountHeadCode: string;
  accountHeadName: string;
  filePath: string;
  lGrpList: any;
  lSubGrpList: any;
  lAccountHeadList: any;

  constructor(chartOfAccounts) {
    {
      this.groupHeadId = chartOfAccounts.groupHeadId ;
      this.groupHeadCode = chartOfAccounts.groupHeadCode ;
      this.groupHeadName = chartOfAccounts.groupHeadName ;
      this.subGroupAcctCode = chartOfAccounts.subGroupAcctCode ;
      this.subGroupAcctName = chartOfAccounts.subGroupAcctName ;
      this.accountHeadCode = chartOfAccounts.accountHeadCode ;
      this.accountHeadName = chartOfAccounts.accountHeadName ;
      this.filePath = chartOfAccounts.filePath ;
      this.lGrpList = chartOfAccounts.lGrpList ;
      this.lSubGrpList = chartOfAccounts.lSubGrpList ;
      this.lAccountHeadList = chartOfAccounts.lAccountHeadList ;
    }
  }
}
