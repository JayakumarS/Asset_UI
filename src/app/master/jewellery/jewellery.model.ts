export class jewel {
    [x: string]: any;
    id:any;
    loginedUser:any;
    caseinhand:number;
    cashatbank:number;
    cloan:number;
    cdate:string;
    jdate:string;
    type:string;
    material:string;
    weight:number;
    price:number;
    loan:number;

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

        }
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
}