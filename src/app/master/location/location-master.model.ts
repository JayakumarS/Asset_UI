import { formatDate } from "@angular/common";
export class LocationMaster {
  [x: string]: any;
  id: number;
  locationCode:number;
  cslLocationCode: number;
  locationName: string;
  country: string;
  active:boolean;

  constructor(locationMaster) {
    {
      this.id = locationMaster.id || this.getRandomID();
      this.locationCode = locationMaster.locationCode || "";
      this.locationName = locationMaster.locationName || "";
      this.country = locationMaster.country || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
