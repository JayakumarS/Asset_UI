

export class AssetReport{

    category: string;
    assetCategory: string;
    assetName: string;
    assetType: string;
   
constructor(AssetReport){
    {
            this.category =  AssetReport.category || "";
            this. assetCategory=  AssetReport. assetCategory || "";
            this. assetName =  AssetReport. assetName || "";
            this.assetType =  AssetReport.assetType|| "";
            
    }
}

}