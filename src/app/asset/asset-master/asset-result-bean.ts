import { AssetMaster } from './asset-model';
export class AssetMasterResultBean {

    success: boolean;
    drugInfoMaster: AssetMaster;
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