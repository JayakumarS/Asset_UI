export class AuthLoginInfo {
    username: string;
    password: string;
    emailId: string;
    recaptchaResponse: string;

    constructor(username: string, password: string,emailId: string, recaptchaResponse : string) {
        this.username = username;
        this.password = password;
        this.emailId = emailId;
        this.recaptchaResponse =recaptchaResponse;
    }
}
