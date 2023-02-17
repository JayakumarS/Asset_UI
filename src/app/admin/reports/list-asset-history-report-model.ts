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
    }
}

public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

}


