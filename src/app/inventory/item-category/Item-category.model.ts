
export class ItemCategory{
    itemCategoryId : number;
    categoryName : string;
    parentCategory : number;
    categoryTypeId : number;
    qualityCheck :  boolean;
    salesTaxesId : number;
    purchaseTaxesId : number;
    incomeAccountId : number;
    expenseAccountId : number;
    batchNo :  boolean;
    mrp :  boolean;
    expiryDate :  boolean;
    manufactureDetails :  boolean;
    itemCategoryDetailList : any;

    //Below Two for list page
	categoryTypeName: string;
    parentCategoryName: string;
}