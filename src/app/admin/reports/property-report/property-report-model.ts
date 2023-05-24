export class PropertyReport{
    
  propertyType:any;
  residencialType:any;
  conpanytype:any;
  gardenLayout:any;
  ownership:any;
  garTech:any;
  
     //checkbox beans
     propertyTypeCheckbox:boolean;
     residencialTypeCheckBox:boolean;
     conpanytypeCheckBox:boolean;
     gardenLayoutCodeCheckBox:boolean;
     ownershipCheckBox:boolean;
     garTechCheckBox:boolean;

  propertyExcelHistoryHeader: any;
  

    constructor(propertyreport) {
        {this.getRandomID();
            this.propertyType = propertyreport.propertyType || "";
            this.residencialType = propertyreport.residencialType || "";
            this.conpanytype = propertyreport.conpanytype || "";
            this.gardenLayout = propertyreport.gardenLayout || "";
            this.ownership = propertyreport.ownership || "";
            this.garTech = propertyreport.garTech || "";
    
    
            this.propertyTypeCheckbox = propertyreport.propertyTypeCheckbox || "";
            this.residencialTypeCheckBox = propertyreport.residencialTypeCheckBox || "";
            this.conpanytypeCheckBox = propertyreport.conpanytypeCheckBox || "";
            this.gardenLayoutCodeCheckBox = propertyreport.gardenLayoutCodeCheckBox || "";
            this.ownershipCheckBox = propertyreport.ownershipCheckBox || "";
            this.garTechCheckBox = propertyreport.garTechCheckBox || "";

        }
    }
    
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
    }