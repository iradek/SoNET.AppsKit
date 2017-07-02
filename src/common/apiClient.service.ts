import { Injectable } from "@angular/core";
import { OAuthGrant } from "./enums";
import { AppsConfig } from "./apps.config";
import { SoNetProxy } from "./soNetProxy.service";

@Injectable()
export class ApiClient {
    constructor(protected sonetProxy: SoNetProxy, protected appsConfig: AppsConfig) {

    }

    async getSettingsAsync(): Promise<any> {
        this.appsConfig.oAuthGrant = OAuthGrant.ClientCredentials;
        return await this.sonetProxy.getAsync("/api/Settings/GetAll");
    }

    async getAllClassifiedsForSite(): Promise<any> {
        this.appsConfig.oAuthGrant = OAuthGrant.ResourceOwner;
        let url = `odata/Classifieds?$filter=SiteName eq '${this.appsConfig.siteName}'`;
        return await this.sonetProxy.getAsync(url);
    }

    async getSiteAsync(): Promise<any> {
        this.appsConfig.oAuthGrant = OAuthGrant.ResourceOwner;
        let url = `odata/Sites('${this.appsConfig.siteName}')`;
        var site = await this.sonetProxy.getAsync(url);
        if (!site)
            throw new Error(`Site '${this.appsConfig.siteName}' does not exist.`);
        return site;
    }


}