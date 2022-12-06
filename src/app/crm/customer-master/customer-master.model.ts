import { formatDate } from "@angular/common";
export class CustomerMaster {
  id: number;
  img: string;
  name: string;
  email: string;
  date: string;
  role: string;
  mobile: string;
  department: string;
  degree: string;
  cusCode: string;
  zipCode:string;
  addressOfCus: string;
  organisationName: string;
  constructor(customerMaster) {
    {
      this.id = customerMaster.id || this.getRandomID();
      this.img = customerMaster.avatar || "assets/images/user/user1.jpg";
      this.name = customerMaster.name || "";
      this.email = customerMaster.email || "";
      this.date = formatDate(new Date(), "yyyy-MM-dd", "en") || "";
      this.role = customerMaster.role || "";
      this.mobile = customerMaster.mobile || "";
      this.department = customerMaster.department || "";
      this.degree = customerMaster.degree || "";
      this.cusCode = customerMaster.cusCode || "";
      this.zipCode = customerMaster.zipCode || "";
      this.addressOfCus = customerMaster.addressOfCus || "";
      this.organisationName = customerMaster.organisationName || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
