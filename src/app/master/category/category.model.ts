export class Assetcategory {

    categoryName: string;
    parentCategory: string;
    Description: string;
    isactive: string;
 
    constructor(assetcategory) {
        {

            this.categoryName = assetcategory.categoryName || "";
            this.parentCategory=assetcategory.parentCategory||"";
            this.isactive=assetcategory.isactive||"";
            this.Description = assetcategory.Description || "";


        }
    
    } 
}