import { Injectable } from "@angular/core";
import { HttpProxy } from "./httpProxy";
import { OAuthConfig } from "./oAuth.config"
import { OAuthGrant } from './enums';

@Injectable()
export class ApiClient {
    constructor(protected httpProxy: HttpProxy, protected oAuthConfig: OAuthConfig) {
        //setup interop for ResourceOwner
        this.oAuthConfig.siteName = this.getInteropValue("app-s-n");
        this.oAuthConfig.userName = this.getInteropValue("app-u");
        this.oAuthConfig.userPassword = this.getInteropValue("app-s");
        this.oAuthConfig.passwordAlreadyEncrypted = true;
    }

    async getSettingsAsync(): Promise<any> {
        this.oAuthConfig.oAuthGrant = OAuthGrant.ClientCredentials;
        return await this.httpProxy.getAsync("/api/Settings/GetAll");
    }

    async getAllClassifiedsForSite(): Promise<any> {
        this.oAuthConfig.oAuthGrant = OAuthGrant.ResourceOwner;
        let url = `odata/Classifieds?$filter=SiteName eq '${this.oAuthConfig.siteName}'`;
        return await this.httpProxy.getAsync(url);
    }

    async getSiteAsync(): Promise<any> {
        this.oAuthConfig.oAuthGrant = OAuthGrant.ResourceOwner;
        let url = `odata/Sites('${this.oAuthConfig.siteName}')`;
        var site = await this.httpProxy.getAsync(url);
        if (!site)
            throw new Error(`Site '${this.oAuthConfig.siteName}' does not exist.`);
        return site;
    }

    private getInteropValue(key: string): string {
        if (!key)
            throw new Error("Invalid key to get interop value for");
        let value = window[key];
        if (!value)
            return "";
        return atob(value);
    }

}