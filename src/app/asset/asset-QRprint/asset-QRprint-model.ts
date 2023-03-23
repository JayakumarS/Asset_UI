export class AssetPrintReport{
    
    
    id: number;
    branch:string;
    category:string;
    location:string;
    department:string;
    brandId:string;
    statusId:string;
    companyId:string;
  assetName: string;
  assetCode: string;
  locationName: string;
  categoryName: string;
  statusName: string;
  status: string;

    constructor(AssetPrintReport) {
        {
            this.branch = AssetPrintReport.branch || "";
            this.category = AssetPrintReport.category || "";
            this.location = AssetPrintReport.location || "";
            this.department = AssetPrintReport.department || "";
            this.brandId = AssetPrintReport.brandId || "";
            this.statusId = AssetPrintReport.statusId || "";
            this.assetName = AssetPrintReport.assetName || "";
            this.assetCode = AssetPrintReport.assetCode || "";
            this.locationName = AssetPrintReport.locationName || "";
            this.categoryName = AssetPrintReport.categoryName || "";
            this.statusName = AssetPrintReport.statusName || "";



        }}
}