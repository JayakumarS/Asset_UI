export class Assetcategory {

    categoryName: string;
    parentCategory: string;
    Description: string;
    isactive: string;
    id: number;
    Success: boolean;
 
    constructor(assetcategory) {
        {

            this.categoryName = assetcategory.categoryName || "";
            this.parentCategory=assetcategory.parentCategory||"";
            this.isactive=assetcategory.isactive||"";
            this.Description = assetcategory.Description || "";
            this.id = assetcategory.id || "";


        }
    
    } 
}