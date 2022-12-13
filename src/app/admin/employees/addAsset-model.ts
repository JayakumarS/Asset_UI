export class AddAsset {
    id: number;
    //info
    assetName: string;
    assetCode: string;
    location: number;
    category: number;
    status: string;
    uploadImg: string;
    //tab1
    brand: string;
    model:string;
    serialNo:string;
    condition:string;
    linkedAsset:string;
    description:string;
    uploadFiles:string;
    //tab2
    vendor:number;
    poNumber: string;
    selfOrPartner:number;
    invoiceDate: string;
    invoiceNo: string;
    purchasePrice: string;
    //tab3
    captitalizationPrice:string;
    captitalizationDate:string;
    endLife:string;
    scrapValue:string;
    depreciation:string;
    //tab4
    department:number;
    allottedUpto:string;
    transferredTo:string;
    remarks:string;
    invoiceDateobj:string;
    captitalizationDateobj:string;
    allottedUptoobj:string;
    Success: boolean;
    
    constructor(addAsset) {
      {
        this.id = addAsset.id || this.getRandomID();
        this.assetName = addAsset.assetName || "";
        this.assetCode = addAsset.assetCode || "";
        this.location = addAsset.location || "";
        this.category = addAsset.category || "";
        this.uploadImg = addAsset.uploadImg || "";
        //tab2
        this.brand = addAsset.brand || "";
        this.model = addAsset.model || "";
        this.serialNo = addAsset.serialNo || "";
        this.condition = addAsset.condition || "";
        this.linkedAsset = addAsset.linkedAsset || "";
        this.description = addAsset.description || "";
        this.uploadFiles = addAsset.uploadFiles || "";
         //tab2
         this.vendor = addAsset.vendor|| "";
         this.poNumber = addAsset.poNumber || "";
         this.selfOrPartner = addAsset.selfOrPartner || "";
         this.invoiceDate = addAsset.invoiceDate || "";
         this.invoiceNo = addAsset.invoiceNo || "";
         this.purchasePrice = addAsset.purchasePrice || "";
          //tab2
          this.captitalizationPrice = addAsset.captitalizationPrice || "";
          this.captitalizationDate = addAsset.captitalizationDate || "";
          this.endLife = addAsset.endLife || "";
          this.scrapValue = addAsset.scrapValue || "";
          this.depreciation = addAsset.depreciation || "";
          //tab2
          this.department = addAsset.department || "";
          this.allottedUpto = addAsset.allottedUpto || "";
          this.transferredTo = addAsset.transferredTo || "";
          this.remarks = addAsset.remarks || "";
          this.invoiceDateobj = addAsset.invoiceDateobj || "";
          this.captitalizationDateobj = addAsset.captitalizationDateobj || "";
          this.allottedUptoobj = addAsset.allottedUptoobj || "";
          
        
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }