export class Fund{
    loginedUser:any;
    name:string;
    investmentexperience:number;
    accountnumber:string;
    tin:string;
    fundname:string;
    assetclass:string;
    tickersymbol:string;
    inceptiondate:string;
    minimuminvestment:number;
    investmentstyle:string;
    expenseratio:number;
    fundNo:string;
    inceptiondateObj:string;
    UserId:string;
    propertyType:string;
    rentalType:string;
    loan:string;
    
    constructor(fund) {
        {
            this.loginedUser = fund.loginedUser || "";
            this.name = fund.name|| "";
            this.investmentexperience = fund.investmentexperience|| "";
            this.accountnumber = fund.accountnumber|| "";
            this.tin=fund.tin || "";
            this.fundname=fund.fundname||"";
            this.assetclass=fund.assetclass||"";
            this.tickersymbol=fund.tickersymbol||"";
            this.inceptiondate=fund.inceptiondate||"";
            this.minimuminvestment=fund.minimuminvestment||"";
            this.investmentstyle=fund.investmentstyle||"";
            this.expenseratio=fund.expenseratio||"";  
        }
}
}