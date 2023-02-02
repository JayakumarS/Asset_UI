import { formatDate } from "@angular/common";
export class UsageMonitor {
  
    asset: string;
    location: string;
    occurence: string;
    remainder: string;
    assignee: string;
    uploadFile: string;
    startdate: string;
    startdateObj: string;
    enddate: string;
    enddateObj: string;
    description: string;
    cc: string;
    meter: string;
    feedValue: string;
    multiplicationFactor: string;
    unitRate: string;
    recordingTime: string;
    additionUnit: string;

  
  constructor(usageMonitor) {
    {
     
  }
}
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

}
