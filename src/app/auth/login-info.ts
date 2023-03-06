export class AuthLoginInfo {
    username: string;
    password: string;
    emailId: string;

    constructor(username: string, password: string,emailId: string) {
        this.username = username;
        this.password = password;
        this.emailId = emailId;
    }
}
