export class MaintenanceAndReport {
    id: number;
    success:boolean;

    assetId: any;
    repairDate: any;
    repairReason: any;
    moveLocation:any;
    expDateOfReturn:any;
    remarks:any;
    reason:any;
    assetLocation:any;
    maintenanceId:any;

    // For Assets labels model
    assetCode: any;
    location: any;
    category: any;
    status: any;
    lifeInYears: any;
    department: any;
    assetOwner: any;

constructor(maintenanceAndReport) {
{
  this.assetId = maintenanceAndReport.assetId ||"";
  this.repairDate = maintenanceAndReport.repairDate ||"";
  this.repairReason = maintenanceAndReport.repairReason || "";
  this.moveLocation = maintenanceAndReport.moveLocation || "";
  this.expDateOfReturn = maintenanceAndReport.expDateOfReturn || "";
  this.remarks = maintenanceAndReport.remarks || "";
  this.reason = maintenanceAndReport.reason || "";
  this.success = maintenanceAndReport.success || "";
  this.maintenanceId = maintenanceAndReport.maintenanceId || "";
}
}
public getRandomID(): string {
const S4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
return S4() + S4();
}
}