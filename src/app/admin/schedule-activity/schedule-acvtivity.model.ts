import { formatDate } from "@angular/common";
export class ScheduleActivityMaster {
  [x: string]: any;
  id: number;
  ActivityType: number;
  Location: string;
  UserGroup: string;
  Description: string;
  Assignee: string;
  AttachFiles: string;
  Occurs: string;
  StartDate: any;
  EndDate: any;
  ActivityReminders: string;
  CC: string;

  constructor(ScheduleActivityMaster) {
    {
      this.id = ScheduleActivityMaster.id || this.getRandomID();
      this.ActivityType = ScheduleActivityMaster.ActivityType || "";
      this.Location = ScheduleActivityMaster.Location || "";
      this.UserGroup = ScheduleActivityMaster.UserGroup || "";
      this.Description = ScheduleActivityMaster.Description || "";
      this.Assignee = ScheduleActivityMaster.Assignee || "";
      this.AttachFiles = ScheduleActivityMaster.AttachFiles || "";
      this.Occurs = ScheduleActivityMaster.Occurs || "";
      this.StartDate = ScheduleActivityMaster.StartDate || "";
      this.EndDate = ScheduleActivityMaster.EndDate || "";
      this.ActivityReminders = ScheduleActivityMaster.ActivityReminders || "";
      this.CC = ScheduleActivityMaster.CC || ""
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
