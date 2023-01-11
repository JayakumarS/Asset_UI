export class ItemMaster {
	itemId : number;
	itemType : number;
	itemName : string;
	itemCode : string;
	itemDescription : string;
	itemCategory : number;
	loginedUser : string;

	// Inventory
	inventoryValuation : number;
	issueMethod : number;

	// Attribute
	batchNo :  boolean;
	expiryDate :  boolean;
	mrp :  boolean;
	manufactureDetails :  boolean;

	specificationList : any;
	vendorList : any;
	
	//For List Page
	itemTypeName : number;
	itemCategoryName : number;

}
