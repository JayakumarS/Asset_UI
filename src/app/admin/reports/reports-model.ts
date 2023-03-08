export class Reportscategory{
    category: string;
    status: string;
    asset: string;
    asset_code: string;
    asset_name: string;
    asset_location: number;
    asset_category: string;
    discard_date: string;
    categoryName: any;
    startdate: string;
    enddate: string;
    company_id: string;
    username: string;
    startdateObj: string;
    enddateObj: string;
  inUse: number;
  location: string;
  inStock: string ;
  repair: string ;
  damaged: string ;
  total: string ;
  depreciationMethod: number;
  assetLocation: number;
  categoryId:  number;
  companyId:any;
  asset_locations: string;
  departments:string;
  allotted_upto:string;
  transferred_to:string;

    constructor(reportscategory) {
        {
          this.getRandomID();
          this.category = reportscategory.category || "";

          this.categoryName = reportscategory.categoryName || "";
          this.status = reportscategory.status || "";
          this.asset = reportscategory.asset || "";
          this.asset_code = reportscategory.asset_code || "";
          this.asset_name = reportscategory.asset_name || "";
          this.asset_location = reportscategory.asset_location || "";
          this.asset_category = reportscategory.asset_category || "";
          this.discard_date = reportscategory.discard_date || "";
          this.startdate = reportscategory.startdate || "";
          this.enddate = reportscategory.enddate || "";
          this.company_id = reportscategory.company_id || "";
          this.username = reportscategory.username || "";
          this.startdateObj = reportscategory.startdateObj || "";
          this.enddateObj = reportscategory.enddateObj || "";
          this.location = reportscategory.location || "";
          this.repair = reportscategory.repair || "";
          this.asset_locations = reportscategory.asset_locations || "";
          
          this.departments = reportscategory.departments || "";
          this.allotted_upto = reportscategory.allotted_upto|| "";

          this.transferred_to = reportscategory.transferred_to|| "";





}
    }

public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

}


