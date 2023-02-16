export class UtilityReport {
    startdate: string;
    startdateObj: string;
    enddate: string;
    enddateObj: string;
    warningSearch: string;
    locationSearch: string;
    search: string;

    date: string;
    meter: string;
    assignee: string;
    warningName: string;
    meterType: string;
    location: string;
    assetName: string;
    startDate: string;
    endDate: string; 
    totalReading: string;
    extraUnit: string;
    unitRate: string;
    mf: string;
    warning: string;
    occurence: string;
    totalConsumption: string;
    variance: string;
    companyId: any;
    categoryName:any;
    assetId:any;
    status:any;
    brand:any;
    model:any;
    purchasePrice:any;
    capitalizationPrice:any;
    endLife:any;
    putuseDate:any;
    assetUser:any;
    totalHours:any;


  
  constructor(UtilityChangeLogReport) {
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
