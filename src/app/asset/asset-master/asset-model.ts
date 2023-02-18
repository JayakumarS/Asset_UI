export class AssetMaster {
	id: number;
	assetId: string;
	assetName: string;
	assetCode: string;
	locationName: string;
	categoryName: string;
	status: string;
	isLine: boolean;


	allottedUpto: string;
	allottedUptoobj: string;
	brand: string;
	captitalizationDate: string;
	captitalizationDateobj: string;
	captitalizationPrice: number;
	category: number;
	condition: string;
	department: number;
	departmentName: string;
	depreciation: string;
	description: string;
	endLife: number;
	imgUploadUrl: string;
	invoiceDate: string;
	invoiceDateobj: string;
	invoiceNo: string;
	linkedAsset: string;
	location: number;
	model: string;
	poNumber: string;
	purchasePrice: string;
	remarks: string;
	scrapValue: number;
	selfOrPartner: string;
	serialNo: string;
	transferredTo: string;
	uploadFiles: string;
	uploadImg: string;
	vendor: string;
	Success: boolean;
	assetDetailsList: []
	detailList: any;
	grnBasedAssetList: any;

	
	os: string;
	processor: string;
	memory: string;
	storage: string;
	monitor: string;
	
	aesthetics: string;
	quality: string;
	safety: string;
	sustainability: string;
	
	device: string;
	deviceModel: string;
	deviceStatus: string;
	
	vehicleType: string;
	vehicleEngine: string;
	vehicleSpeed: string;
	fuelCapacity: string;
	vehicleWeight: string;
	
	lifeTime: string;
	costOfLand: string;
	substance: string;

	rentedUptoDate: string;
    rentedUptoDateObj: string;
    thirdPartyUptoDate: string;
    thirdPartyUptoDateObj: string;

	insuranceDate: string;
    insuranceDateObj: string;

} 