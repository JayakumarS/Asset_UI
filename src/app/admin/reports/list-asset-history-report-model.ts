export class AssetHistoryReport{
    branch: any;
    category: any;
    location: any;
    department: any;
    vendor: any;
    assetName: any;
    financialYear: any;
    putInUse: any;
    assetOwner: any;
    // Checkboxes beans
    assetNameCheckBox:boolean;
    assetCodeCheckBox:boolean;
    assetCategoryCheckBox:boolean;
    assetLocationCheckBox:boolean;
    assetUserCheckBox:boolean;
    captitalizationPriceCheckBox:boolean;
    modelCheckBox:boolean;
    putInUseDateCheckBox:boolean;
    brandCheckBox:boolean;
    statusCheckBox:boolean;
    endLifeCheckBox:boolean;
    purchasePriceCheckBox:boolean;
    totalHoursUsageCheckBox:boolean;

    departmentCheckBox:boolean;
    invoiceNoCheckBox:boolean;
    invoiceDateCheckBox:boolean;
    capitalizationDateCheckBox:boolean;
    businessAreaCheckBox:boolean;
    vendorCheckBox:boolean;
    costCheckBox:boolean;
    sapCodeCheckBox:boolean;

    assetExcelHistoryHeader:any;

constructor(assetHistoryReport) {
    {
        this.getRandomID();
        this.branch = assetHistoryReport.branch || "";
        this.category = assetHistoryReport.category || "";
        this.location = assetHistoryReport.location || "";
        this.department = assetHistoryReport.department || "";
        this.vendor = assetHistoryReport.vendor || "";
        this.assetName = assetHistoryReport.assetName || "";
        this.financialYear = assetHistoryReport.financialYear || "";
        this.putInUse = assetHistoryReport.putInUse || "";
        this.assetOwner = assetHistoryReport.assetOwner || "";
        this.assetNameCheckBox = assetHistoryReport.assetNameCheckBox || "";
        this.assetCodeCheckBox = assetHistoryReport.assetCodeCheckBox || "";
        this.assetCategoryCheckBox = assetHistoryReport.assetCategoryCheckBox || "";
        this.assetLocationCheckBox = assetHistoryReport.assetLocationCheckBox || "";
        this.modelCheckBox = assetHistoryReport.modelCheckBox || "";
        this.captitalizationPriceCheckBox = assetHistoryReport.captitalizationPriceCheckBox || "";
        this.assetUserCheckBox = assetHistoryReport.assetUserCheckBox || "";
        this.totalHoursUsageCheckBox = assetHistoryReport.totalHoursUsageCheckBox || "";
        this.putInUseDateCheckBox = assetHistoryReport.putInUseDateCheckBox || "";
        this.brandCheckBox = assetHistoryReport.brandCheckBox || "";
        this.statusCheckBox = assetHistoryReport.statusCheckBox || "";
        this.endLifeCheckBox = assetHistoryReport.endLifeCheckBox || "";
        this.purchasePriceCheckBox = assetHistoryReport.purchasePriceCheckBox || "";
        this.department = assetHistoryReport.department || "";
    }
}

public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

}


