import { Injectable } from "@angular/core";
import { HttpProxy } from "./httpProxy";
import { OAuthGrant } from "./enums";
import { AppsConfig } from "./apps.config";

@Injectable()
export class ApiClient {
    constructor(protected httpProxy: HttpProxy, protected appsConfig: AppsConfig) {

    }

    async getSettingsAsync(): Promise<any> {
        this.appsConfig.oAuthGrant = OAuthGrant.ClientCredentials;
        return await this.httpProxy.getAsync("/api/Settings/GetAll");
    }

    async getAllClassifiedsForSite(): Promise<any> {
        this.appsConfig.oAuthGrant = OAuthGrant.ResourceOwner;
        let url = `odata/Classifieds?$filter=SiteName eq '${this.appsConfig.siteName}'`;
        return await this.httpProxy.getAsync(url);
    }

    async getSiteAsync(): Promise<any> {
        this.appsConfig.oAuthGrant = OAuthGrant.ResourceOwner;
        let url = `odata/Sites('${this.appsConfig.siteName}')`;
        var site = await this.httpProxy.getAsync(url);
        if (!site)
            throw new Error(`Site '${this.appsConfig.siteName}' does not exist.`);
        return site;
    }


}