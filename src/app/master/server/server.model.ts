export class Assetserver {

    customer: string;
    publicIp: string;
    privateIp: string;
    osType: string;
    serverName: string;
    core: string;
    ram: string;
    hdd: string;
    ports: string;
    location: string;
    applications: string;
    dbName: string;
    dbPwd: string;
    dbPort: string;
    dumpLocation: string;
    crontabConfig: string;
    backupLocation: string;
    url: string;
    loginName: string;
    loginPwd: string;
    username: string;
    usernamePwd: string;
    isAdmin: boolean;

    constructor(serverRegister){
        this.customer = serverRegister.customer || "";
        this.publicIp = serverRegister.publicIp || "";
        this.privateIp = serverRegister.privateIp || "";
        this.osType = serverRegister.osType || "";
        this.serverName = serverRegister.serverName || "";
        this.core = serverRegister.core || "";
        this.ram = serverRegister.ram || "";
        this.hdd = serverRegister.hdd || "";
        this.ports = serverRegister.ports || "";
        this.location = serverRegister.location || "";
        this.applications = serverRegister.applications || "";
        this.dbName = serverRegister.dbName || "";
        this.dbPwd = serverRegister.dbPwd || "";
        this.dbPort = serverRegister.dbPort || "";
        this.dumpLocation = serverRegister.dumpLocation || "";
        this.crontabConfig = serverRegister.crontabConfig || "";
        this.backupLocation = serverRegister.backupLocation || "";
        this.url = serverRegister.url || "";
        this.loginName = serverRegister.loginName || "";
        this.loginPwd = serverRegister.loginPwd || "";
        this.username = serverRegister.username || "";
        this.usernamePwd = serverRegister.usernamePwd || "";
        this.isAdmin = serverRegister.isAdmin || "";
    }

}
