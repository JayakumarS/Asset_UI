export class Assetcategory {

    categoryName: string;
    parentCategory: string;
    Description: string;
    isactive: string;
    depreciation: string;
    assettype: string;
    currency: string;
    id: number;
    Success: boolean;
    countOfCategory:any;
 
    constructor(assetcategory) {
        {

            this.categoryName = assetcategory.categoryName || "";
            this.parentCategory=assetcategory.parentCategory||"";
            this.isactive=assetcategory.isactive||"";
            this.Description = assetcategory.Description || "";
            this.assettype=assetcategory.assettype||"";
            this.currency=assetcategory.currency||"";
            this.depreciation = assetcategory.depreciation || "";
            this.id = assetcategory.id || "";
            this.countOfCategory = assetcategory.countOfCategory || "";

        }
    
    } 
}