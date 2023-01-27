import { Role } from "../core/models/role";


export class JwtResponse {
    accessToken: string;
    type: string;
    username: string;
    roles: [];
    success:boolean;
    message:string;
    email:string;
    role:string;
    userDetails:any;
    
}
