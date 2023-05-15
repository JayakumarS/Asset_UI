export class Deposit {


    loginedUser:string;
    bankName:string;
    investmentTerm:string;
    autoRenewal:string;
    id:number;
    dueAmount:number;
    fdendDate:string;
    fixeddeposittype:string;
    fdstartDate:string;
    fdRef:string;
    fdamt:number;
    penaltyAmt:number;
    ifscCode:string;
    fdaccountNo:number;
    interest :string;
    applicationNo:any
    fdName:any;
    dob:string;
    mail:string;
    phone:string;
    address:string;
    country:string;
    postcode:number;
    currency:string;
    frequency:string;

       
    constructor(Deposit) {
        {  this.id = Deposit.id;
            this.loginedUser = Deposit.loginedUser || "";
           
            this.bankName = Deposit.bankName || "";
           
            
            this.investmentTerm = Deposit.investmentTearm || "";
            this.autoRenewal = Deposit.autoRenewalr || "";
           
            this.fdendDate = Deposit.fdendDate || "";
            this.fdstartDate = Deposit.fdstartDate || "";
            this.fdRef = Deposit.fdRef || "";
            this.fixeddeposittype = Deposit.fixeddeposittype || "";
           
        }
    }
}

