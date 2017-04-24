import { Injectable } from '@angular/core';
import { AppsConfig } from './apps.config'

@Injectable()
export class UrlService {
    
    constructor(private appsConfig: AppsConfig) { }

    /** Resolves give url to a final absolute url with a hostname */
    resolveFinalUrl(url: string): string {
        if (!url)
            throw new Error("Invalid url to resolve.");
        return this.appsConfig.api_baseUrl + (url.startsWith("/") ? url : "/" + url)
    }

}