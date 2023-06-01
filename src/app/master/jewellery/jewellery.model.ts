export class jewel {
    [x: string]: any;
    id:any;
    loginedUser:any;
    cdate:string;
    type:string;
    material:string;
    weight:number;
    selforgift:string;
    location:string;
    lockerInHand:string;
    lockerRent:any;
    lockerSize:any;
    bankName:string;
    lockerNo:any;
    currentValue:any;
    specification:string;
    description:string;
    noOfPiece:any;
    purchasedfrom:string;
    purchaseValue:any;
    jewelName:any;
    jewelcolour:any;
    gemstones:string;
    caratweight:number;

    shopBank:string;
    
    location2:string;
    shopbankname:string;
    startdate:string;
    mortgageamount:number;
    interestrate:string;
    payment:number;

    constructor(jewel) {
        {
          this.id = jewel.id || this.getRandomID();
          this.loginedUser = jewel.loginedUser || "";
          this.caseinhand = jewel.caseinhand || "";
          this.cashatbank = jewel.cashatbank || "";
          this.cloan = jewel.cloan || "";
          this.cdate = jewel.cdate || "";
          this.jdate = jewel.jdate || "";
          this.type = jewel.type || "";
          this.material = jewel.material || "";
          this.weight = jewel.weight || "";
          this.price = jewel.price || "";
          this.loan = jewel.loan || "";
          this.gemstones = jewel.gemstones || "";
          this.caratweight = jewel.caratweight || "";

          this.location2 = jewel.location2 || "";
          this.shopbankname = jewel.shopbankname || "";
          this.startdate = jewel.startdate || "";
          this.mortgageamount = jewel.mortgageamount || "";
          this.interestrate = jewel.interestrate || "";
          this.payment = jewel.payment || "";

        }
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
}