import { Role } from "./role";

export class User {
  id: number;
  img: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
  roleId:number;
  company:string;
  companyId:number;
  branchId:number;
  companies:[];
  roles: [];
  
}
