import { formatDate } from "@angular/common";
export class ScheduleActivityMaster {
  
  id: number;
  activityType: string;
  location: string;
  activityTypename: any;
  locationname: any;
  userGroup: string;
  description: string;
  assignee: string;
  attachFiles: string;
  occurs: string;
  startDate: any;
  endDate: any;
  activityReminders: string;
  cc: string;
  Success: boolean;

  constructor(ScheduleActivityMaster) {
    {
      this.id = ScheduleActivityMaster.id || this.getRandomID();
      this.activityType = ScheduleActivityMaster.activityType || "";
      this.location = ScheduleActivityMaster.location || "";
      this.userGroup = ScheduleActivityMaster.userGroup || "";
      this.description = ScheduleActivityMaster.description || "";
      this.assignee = ScheduleActivityMaster.assignee || "";
      this.attachFiles = ScheduleActivityMaster.attachFiles || "";
      this.occurs = ScheduleActivityMaster.occurs || "";
      this.startDate = ScheduleActivityMaster.startDate || "";
      this.endDate = ScheduleActivityMaster.endDate || "";
      this.activityReminders = ScheduleActivityMaster.activityReminders || "";
      this.cc = ScheduleActivityMaster.CC || ""
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
