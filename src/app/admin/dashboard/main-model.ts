import { formatDate } from "@angular/common";
export class main {
  id: number;
 

  assetName: string;
  assetCode: string;
  assetLocation: string;
  category: string;
  status: string;
  
  constructor(main) {
    {
      this.id = main.id || this.getRandomID();
      this.assetName = main.assetName || "";
      this.assetCode = main.assetCode || "";
      this.assetLocation = main.assetLocation || "";
      this.category = main.category || "";
      this.status = main.status || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
