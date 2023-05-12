export class VehicleMaster {
  id: any;
  vehiclename: string;
  vehicletype: string;
  vehiclebrand : string;
  regno: string;
  chassisno: string;
  engineno: string;
  bodytype: string;
  fueltype: string;
  ownertype: string;
  dateofpurc: string;
  insurancedetails: string;
  service: string;
  discardFromDate: string;
  discardFromDate1 : string;
  vehiclewheel: string;
  colour : string;
  age : string;
  rtocode : string;
  purcamount:number;
  insurancetype : string;
  insuredamount :number;
  payment : string;
  insurername : string;
  validity : number;
  address : string;
  yom : number;
  license  : string;
  lin : string;
  agency: string;
  emiamount:number;
  
  constructor(vehicleMaster) {
    {
      this.id = vehicleMaster.id ||"";
      this.vehiclename = vehicleMaster.vehiclename || "";
      this.vehicletype = vehicleMaster.vehicletype || "";
      this.vehiclebrand  = vehicleMaster.vehiclebrand || "";
      this.regno = vehicleMaster.regno || "";
      this.chassisno = vehicleMaster.chassisno || "";
      this.engineno = vehicleMaster.engineno || "";
      this.bodytype = vehicleMaster.bodytype || "";
      this.fueltype = vehicleMaster.fueltype || "";
      this.ownertype = vehicleMaster.ownertype || "";
      this.dateofpurc = vehicleMaster.dateofpurc || "";
      this.insurancedetails = vehicleMaster.insurancedetails || "";
      this.service = vehicleMaster.service || "";
      this.discardFromDate = vehicleMaster.discardFromDate || "";
      this.discardFromDate1  = vehicleMaster.discardFromDate1 || "";
      this.vehiclewheel = vehicleMaster.vehiclewheel || "";
      this.colour  = vehicleMaster.colour || "";
      this.age  = vehicleMaster.age || "";
      this.rtocode  = vehicleMaster.rtocode || "";
      this.purcamount = vehicleMaster.purcamount || "";
      this.insurancetype  = vehicleMaster.insurancetype || "";
      this.insuredamount  = vehicleMaster.insuredamount || "";
      this.payment  = vehicleMaster.payment || "";
      this.insurername  = vehicleMaster.insurername || "";
      this.validity  = vehicleMaster.validity || "";
      this.address  = vehicleMaster.address || "";
      this.yom  = vehicleMaster.yom || "";
      this.license   = vehicleMaster.license || "";
      this.lin  = vehicleMaster.lin || "";
      this.agency = vehicleMaster.agency || "";
      this.emiamount = vehicleMaster.emiamount || "";

    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}