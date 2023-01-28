export class Reportscategory{
    category:string;
    status:string;
    asset:string;
    asset_code:string;
    asset_name:string;
    asset_location:number;
    asset_category:string;
    discard_date:string;
    
    startdate:string;
    enddate:string;
    company:string;
    username:string;
    startdateObj:string;
    enddateObj:string;
    

    constructor(reportscategory) {
        {
          this.getRandomID();
          this.category = reportscategory.category || "";
          this.status = reportscategory.status || "";
          this.asset = reportscategory.asset || "";
          this.asset_code = reportscategory.asset_code || "";
          this.asset_name = reportscategory.asset_name || "";
          this.asset_location = reportscategory.asset_location || "";
          this.asset_category = reportscategory.asset_category || "";
          this.discard_date = reportscategory.discard_date || "";
          this.startdate = reportscategory.startdate || "";
          this.enddate = reportscategory.enddate || "";
          this.company = reportscategory.company || "";
          this.username = reportscategory.username || "";
          this.startdateObj = reportscategory.startdateObj || "";
          this.enddateObj = reportscategory.enddateObj || "";




}
    }

public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

}


