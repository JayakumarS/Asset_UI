export class ApplicationDetails{

    applicationUrl: string;
    feCode: string;
    beCode: string;
    db: string;
    repository: string;
    source: string;
    url: string;
    constructor(applicationRegister){
        this.applicationUrl = applicationRegister.applicationUrl || "";
        this.feCode = applicationRegister.feCode || "";
        this.beCode = applicationRegister.beCode || "";
        this.db = applicationRegister.db || "";
        this.repository = applicationRegister.repository || "";
        this.source = applicationRegister.source || "";
        this.url = applicationRegister.url || "";
    }

}
