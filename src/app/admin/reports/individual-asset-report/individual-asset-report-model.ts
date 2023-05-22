

export class AssetReport{

    userid: number;
    category: string;
    assetCategory: string;
    assetName: string;
    assetType: string;
   



constructor(AssetReport){
    {
        this. userid =  AssetReport. userid || "";
            this.category =  AssetReport.category || "";
            this. assetCategory=  AssetReport. assetCategory || "";
            this. assetName =  AssetReport. assetName || "";
            this.assetType =  AssetReport.assetType|| "";
            
    }
}

}