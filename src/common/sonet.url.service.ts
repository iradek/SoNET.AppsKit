import { Injectable } from '@angular/core';
import { SoNetAppsConfig } from './sonet.apps.config'

@Injectable()
export class SoNetUrlService {

    constructor(private appsConfig: SoNetAppsConfig) { }

    /**
     *  Resolves given url to a final absolute url with a hostname.
     *  When appsConfig.api_baseUrl is not defined - current host name acts as a baseUrl.
     */
    resolveFinalUrl(url: string): string {
        if (!url)
            throw new Error("Invalid url to resolve.");
        if (this.appsConfig && this.appsConfig.logging)
            console.log("Resolving url", url);            
        if (url.startsWith("http")) {
            if (this.appsConfig && this.appsConfig.logging)
                console.log("Resolved url", url);
            return url; //allow to override
        }
        url = url.replace("~/", "/");
        let currentLocation = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        let resolvedUrl = (this.appsConfig.api_baseUrl || currentLocation) + (url.startsWith("/") ? url : "/" + url)
        if (this.appsConfig && this.appsConfig.logging)
            console.log("Resolved url", resolvedUrl);
        return resolvedUrl;
    }

}