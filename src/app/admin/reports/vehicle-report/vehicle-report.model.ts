export class Vehiclereport{

  vehicletype: string;
  fueltype: string;
  bodytype: string;
  ownertype: string;
  vehiclewheel: string;
  insurancetype : string;
  
  userId: string


  vehicletypeCheckbox:boolean;
  fueltypeCheckBox:boolean;
  bodytypeCheckBox:boolean;
  ownertypeCheckBox:boolean;
  vehiclewheelCheckBox:boolean;
  insurancetypeCheckBox:boolean;
  regnoCheckBox:boolean;
  enginenoCheckBox:boolean;

  vehicleExcelHistoryHeader:any;


  constructor(vehiclereport) {
    {
        this.getRandomID();
        this.vehicletype = vehiclereport.vehicletype || "";
        this.fueltype = vehiclereport.fueltype || "";
        this.bodytype = vehiclereport.bodytype || "";
        this.ownertype = vehiclereport.ownertype || "";
        this.vehiclewheel = vehiclereport.vehiclewheel || "";
        this.insurancetype = vehiclereport.insurancetype || "";


      
    
    }
}

public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

}

