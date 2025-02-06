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
    serverPerformance: string;
    url: string;
    loginName: string;
    loginPwd: string;
    username: string;
    usernamePwd: string;
    isAdmin: boolean;

    customerTypeCheckbox: boolean;
    publicIpTypeCheckbox: boolean;
    privateIpTypeCheckbox: boolean;
    osTypeCheckbox: boolean;
    serverNameTypeCheckbox: boolean;
    coreTypeCheckbox: boolean;
    ramTypeCheckbox: boolean;
    hddTypeCheckbox: boolean;
    portsTypeCheckbox: boolean;
    locationTypeCheckbox: boolean;
    applicationsTypeCheckbox: boolean;
    dumpLocationTypeCheckbox: boolean;
    dbNameTypeCheckbox: boolean;
    dbPwdTypeCheckbox: boolean;
    dbPortTypeCheckbox: boolean;
    urlTypeCheckbox: boolean;
    loginNameTypeCheckbox: boolean;
    loginPwdTypeCheckbox: boolean;
    crontabConfigTypeCheckbox: boolean;
    backupLocationTypeCheckbox: boolean;
    serverPerformanceTypeCheckbox: boolean;

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
        this.serverPerformance = serverRegister.serverPerformance || "";
        this.url = serverRegister.url || "";
        this.loginName = serverRegister.loginName || "";
        this.loginPwd = serverRegister.loginPwd || "";
        this.username = serverRegister.username || "";
        this.usernamePwd = serverRegister.usernamePwd || "";
        this.isAdmin = serverRegister.isAdmin || "";


        this.customerTypeCheckbox = serverRegister.customerTypeCheckbox || "";
        this.publicIpTypeCheckbox = serverRegister.publicIpTypeCheckbox || "";
        this.privateIpTypeCheckbox = serverRegister.privateIpTypeCheckbox || "";
        this.osTypeCheckbox = serverRegister.osTypeCheckbox || "";
        this.serverNameTypeCheckbox = serverRegister.serverNameTypeCheckbox || "";
        this.coreTypeCheckbox = serverRegister.coreTypeCheckbox || "";
        this.ramTypeCheckbox = serverRegister.ramTypeCheckbox || "";
        this.hddTypeCheckbox = serverRegister.hddTypeCheckbox || "";
        this.portsTypeCheckbox = serverRegister.portsTypeCheckbox || "";
        this.locationTypeCheckbox = serverRegister.locationTypeCheckbox || "";
        this.applicationsTypeCheckbox = serverRegister.applicationsTypeCheckbox || "";
        this.dumpLocationTypeCheckbox = serverRegister.dumpLocationTypeCheckbox || "";
        this.dbNameTypeCheckbox = serverRegister.dbNameTypeCheckbox || "";
        this.dbPwdTypeCheckbox = serverRegister.dbPwdTypeCheckbox || "";
        this.dbPortTypeCheckbox = serverRegister.dbPortTypeCheckbox || "";
        this.urlTypeCheckbox = serverRegister.urlTypeCheckbox || "";
        this.loginNameTypeCheckbox = serverRegister.loginNameTypeCheckbox || "";
        this.loginPwdTypeCheckbox = serverRegister.loginPwdTypeCheckbox || "";
        this.crontabConfigTypeCheckbox = serverRegister.crontabConfigTypeCheckbox || "";
        this.backupLocationTypeCheckbox = serverRegister.backupLocationTypeCheckbox || "";
        this.serverPerformanceTypeCheckbox = serverRegister.serverPerformanceTypeCheckbox || "";


    }

}
