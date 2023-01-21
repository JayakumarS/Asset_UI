export class CustomerMaster {
    cus_id:number;
    auditorname: string;
    registercode: string;
    person:string;
    email:string;
    phone:number;
    address:string;
    addresstwo:string;
    city:number;
    state:string;
    postalcode:string;
    panno:string;
    gstno:string;
    cstno:string;
    remarks:string;
    active:string;

    constructor(CustomerMaster) {
        {
          this.cus_id = CustomerMaster.cus_id || this.getRandomID();
          this.auditorname = CustomerMaster.commodityCode || "";
          this.registercode = CustomerMaster.registercode || "";
          this.person = CustomerMaster.person || "";
          this.email = CustomerMaster.email || "";
          this.phone = CustomerMaster.phone || "";
          this.address = CustomerMaster.address || "";
          this.addresstwo = CustomerMaster.addresstwo || "";
          this.city = CustomerMaster.city || "";
          this.state = CustomerMaster.state || "";
          this.postalcode = CustomerMaster.postalcode || "";
          this.panno = CustomerMaster.panno || "";
          this.gstno = CustomerMaster.gstno || "";
          this.cstno = CustomerMaster.cstno || "";
          this.remarks = CustomerMaster.remarks || "";
          this.active = CustomerMaster.active || "";

        }
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
    }
