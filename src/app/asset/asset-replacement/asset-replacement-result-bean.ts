import { AssetReplacement } from "./asset-replacement.model";

export class AssetReplacementResultBean {

    success: boolean;
    drugInfoMaster: AssetReplacement;
    listDrugInfoMasterBean: [];
    listDrugInfoListBean: [];
    manufacturerList: [];
    assetList: [];
    addAssetBean: [];
   
    categoryList:[];
    categoryDropdown:[];
    locationDropdown:[];
    departmentDropdown:[];
  countryMasterDetails:[];
}