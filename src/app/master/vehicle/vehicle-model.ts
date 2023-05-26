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
  validity : string;
  validity1 : string;
  address : string;
  yom : number;
  license  : string;
  lin : string;
  agency: string;
  emiamount:number;

  seater:number;
  purpose: string;
  drivetype:string; 
  bodytype1:string; 
  others: string; 
  uid:string;
  password:string;
  parivahan:string;
  autoDebit:boolean;
  bankName:string;
  branchName:string;
  ifscCode:string;
  acName:string;
  acNumber:string;
  loanAmount:number;
  loanNo:number;
  emiDate:string;
  emiDateObj:string;
  loanInterest:number;
  loanVehicle:string;
  vin:string;
  condition:string;
  mileage:number;
  nextservice:string;
  discardFromDate5:string;
  transmissiontype:string;
  feature:string;
  description:string;
 
  




  
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

      this.seater = vehicleMaster.seater || "";
      this.purpose = vehicleMaster.purpose || "";
      this.drivetype = vehicleMaster.drivetype || "";
      this.bodytype1 = vehicleMaster.bodytype1 || "";
      this.others = vehicleMaster.others || "";
      this.uid = vehicleMaster.uid || "";
      this.password = vehicleMaster.password || "";
      this.parivahan = vehicleMaster.parivahan || "";
      this.autoDebit = vehicleMaster.autoDebit || "";
      this.bankName = vehicleMaster.bankName || "";
      this.branchName = vehicleMaster.branchName || "";
      this.ifscCode = vehicleMaster.ifscCode || "";
      this.acName = vehicleMaster.acName || "";
      this.acNumber = vehicleMaster.acNumber || "";
      this.loanAmount = vehicleMaster.loanAmount || "";
      this.loanNo = vehicleMaster.loanNo || "";
      this.emiDate = vehicleMaster.emiDate || "";
      this.emiDateObj = vehicleMaster.emiDateObj || "";
      this.loanInterest = vehicleMaster.loanInterest || "";
      this.loanVehicle = vehicleMaster.loanVehicle || "";
      this.vin = vehicleMaster.vin || "";
      this.condition= vehicleMaster.condition || "";
      this.mileage= vehicleMaster.mileage || "";
      this.nextservice= vehicleMaster.nextservice || "";
      this.discardFromDate5= vehicleMaster.discardFromDate5|| "";
      this.transmissiontype= vehicleMaster.transmissiontype || "";
      this.feature= vehicleMaster.feature || "";
      this.description= vehicleMaster.description|| "";








    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}