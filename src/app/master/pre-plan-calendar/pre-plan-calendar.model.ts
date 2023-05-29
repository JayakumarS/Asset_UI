import { formatDate } from "@angular/common";

export class PrePlanCalendar
{
    id:number;
  itemCode:string;
  itemName:string;
  itemType:string;
  idleTime:string;
loginedUser:any;
  Success:boolean;
  userName:string;
    dtype:string;
    damount:number;
    dpay:string;
    dbankname:string;
    remarks:string;
userId: string;
  constructor(idleTiming) {
    {
      this.id = idleTiming.id || this.getRandomID();
      this.loginedUser = idleTiming.loginedUser || "";
    //   this.itemCode = idleTiming.itemCode || "";
    //   this.itemName = idleTiming.itemName || "";
    //   this.itemType = idleTiming.itemType || "";
    //   this.idleTime = idleTiming.idleTime || "";
      this.userName = idleTiming.userName || "";
      this.dtype = idleTiming.dtype || "";
      this.damount = idleTiming.damount || "";
      this.dpay = idleTiming.dpay || "";
      this.dbankname = idleTiming.dbankname || "";
      this.remarks = idleTiming.remarks || "";

    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

}