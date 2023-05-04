export class Vehicle{
    registrationNumber :string;
    brand:string;
    bodyStyle:string;
    dateOfbuying:string;
    driveType:string;
    transmissionType:string;
    engineType:string;
    rtoCode:string;
    tin:string;
    vehicleColour:string;
    insurancetype:string;
    number:string;
    ownership:string;
    vin:string;
    loginedUser:string;
    id:number;
constructor(VehicleModel){
    {
    this.registrationNumber=VehicleModel.registrationNumber ||"";
    this. brand=VehicleModel.brand ||"";
    this.bodyStyle=VehicleModel.bodyStyle||"";
    this.dateOfbuying=VehicleModel.dateOfbuying||"";
    this.driveType=VehicleModel.driveType ||"";
    this.transmissionType=VehicleModel.transmissionType||"";
    this.engineType=VehicleModel.engineType ||"";
    this.rtoCode=VehicleModel.rtocode||"";
    this.tin=VehicleModel.tin||"";
    this.vehicleColour=VehicleModel.vehicleColour||"";
    this.insurancetype=VehicleModel.insurancetype||"";
    this.number=VehicleModel.number||"";
    this.ownership=VehicleModel.ownership||"";
    this.vin=VehicleModel.vin||"";
    this.loginedUser=VehicleModel.loginedUser||"";
}
}

}