export class AuditableAsset {
  
  id: number;
  slno: number;
  assetid: string;
  assetname: string;
  currency: string;
  acquisitiondt: string;
  acquisitionvalue: string;
  accudepreciation: any;
  bookvalue: any;
  success: boolean;
  depreciationMethod:any;
  assetType:any;
  salvageValue:any;
  lifeInYears:any;
  value:any;

  constructor(auditableAsset) {
    {
      this.id = auditableAsset.id || this.getRandomID();
      this.slno = auditableAsset.slno || "";
      this.assetid = auditableAsset.assetid || "";
      this.assetname = auditableAsset.assetname || "";
      this.currency = auditableAsset.currency || "";
      this.acquisitiondt = auditableAsset.acquisitiondt || "";
      this.acquisitionvalue = auditableAsset.acquisitionvalue || "";
      this.accudepreciation = auditableAsset.accudepreciation || "";
      this.bookvalue = auditableAsset.bookvalue || "";
      this.depreciationMethod = auditableAsset.depreciationMethod || "";
      this.assetType = auditableAsset.assetType || "";
      this.assetType = auditableAsset.assetType || "";
      this.lifeInYears = auditableAsset.lifeInYears || "";
      this.success = auditableAsset.success || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
