import { formatDate } from "@angular/common";
export class GroupHeadMaster {
  groupHeadId: number;
  groupHeadCode: string;
  groupHeadName: string;

  constructor(groupHeadMaster) {
    {
      this.groupHeadId = groupHeadMaster.groupHeadId ;
      this.groupHeadCode = groupHeadMaster.groupHeadCode ;
      this.groupHeadName = groupHeadMaster.groupHeadName ;
    }
  }
}
