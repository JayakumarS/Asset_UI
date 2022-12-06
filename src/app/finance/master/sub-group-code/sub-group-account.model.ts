import { formatDate } from "@angular/common";
export class SubGroupAccountMaster {
  subGroupCode: string;
  subGroupName: string;
  grpHeadCode: string;
  grpHeadName: string;
  subGroupDesc: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
  sgType: string;
  lAttributes: Array<string>;

  constructor(subGroupAccountMaster) {
    {
      this.subGroupCode = subGroupAccountMaster.subGroupCode ;
      this.subGroupName = subGroupAccountMaster.subGroupName ;
      this.grpHeadCode = subGroupAccountMaster.grpHeadCode || "";
      this.subGroupDesc = subGroupAccountMaster.subGroupDesc || "";
      this.grpHeadName = subGroupAccountMaster.grpHeadName || "";
      this.createdBy = subGroupAccountMaster.createdBy || "";
      this.createdDate = subGroupAccountMaster.createdDate || "";
      this.modifiedBy = subGroupAccountMaster.modifiedBy || "";
      this.modifiedDate = subGroupAccountMaster.modifiedDate || "";
      this.sgType = subGroupAccountMaster.sgType || "";
      this.lAttributes = subGroupAccountMaster.lAttributes || [];
    }
  }
}
