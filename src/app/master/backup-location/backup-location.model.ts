export class BackupLocation {

    backupName: string;
    serverIp: string;
    locationName: string;
    location: string;
    constructor(backuplocationRegister){
        this.backupName = backuplocationRegister.backupName || "";
        this.serverIp = backuplocationRegister.serverIp || "";
        this.locationName = backuplocationRegister.locationName || "";
        this.location = backuplocationRegister.location || "";
    }

}
