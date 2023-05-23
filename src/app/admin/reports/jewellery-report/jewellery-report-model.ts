export class JewelReport{
    material: String;
    
    type: String;
    
    userid: String;

     // Checkboxes Beans
     jnameCheckbox:boolean;
     jcolourCheckBox:boolean;
     purchasevalueCheckBox:boolean;
     noofpiecesCheckBox:boolean;
     typeCheckbox:boolean;
     specificationCheckBox:boolean;
     descriptionCheckBox:boolean;
     materialCheckBox:boolean;
     currentvalueCheckbox:boolean;
     weightCheckBox:boolean;
     lockerNoCheckBox:boolean;
     bankNameCheckBox:boolean;
     lockerSizeCheckbox:boolean;
     lockerRentCheckBox:boolean;
     jewelExcelHistoryHeader:any;

constructor(jewelReport) {
    {
        this.getRandomID();
        this.material = jewelReport.material || "";
        this.type = jewelReport.type || "";
        this.jnameCheckbox = jewelReport.jnameCheckbox || "";
        this.jcolourCheckBox = jewelReport.jcolourCheckBox || "";
        this.purchasevalueCheckBox = jewelReport.purchasevalueCheckBox || "";
        this.noofpiecesCheckBox = jewelReport.noofpiecesCheckBox || "";
        this.typeCheckbox = jewelReport.typeCheckbox || "";
        this.specificationCheckBox = jewelReport.specificationCheckBox || "";
        this.descriptionCheckBox = jewelReport.descriptionCheckBox || "";
        this.materialCheckBox = jewelReport.materialCheckBox || "";
        this.currentvalueCheckbox = jewelReport.currentvalueCheckbox || "";
        this.weightCheckBox = jewelReport.weightCheckBox || "";
        this.lockerNoCheckBox = jewelReport.lockerNoCheckBox || "";
        this.bankNameCheckBox = jewelReport.bankNameCheckBox || "";
        this.lockerSizeCheckbox = jewelReport.lockerSizeCheckbox || "";
        this.lockerRentCheckBox = jewelReport.lockerRentCheckBox || "";
    
    }
}

public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

}


