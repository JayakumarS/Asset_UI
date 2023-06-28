export class Bday{
    loginedUser: string;
    UserId:string;
    rname:string;
    birthdaydate:string;
    birthdaydateObj:string;
 


constructor(Bday){
    {
        this.loginedUser = Bday.loginedUser || "";
        this.UserId = Bday.UserId || "";

        this.rname  = Bday.rname || "";
        this.birthdaydate = Bday.birthdaydate || "";
        this.birthdaydateObj = Bday.birthdaydateObj || "";
        
        
        
    }

}
}