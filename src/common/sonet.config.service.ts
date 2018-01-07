import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SoNetAppsConfig } from "./sonet.apps.config";

@Injectable()
/**
 * Loads a configuration from the file.
 */
export class SoNetConfigService {
    private _config: SoNetAppsConfig;        

    constructor(private http: Http) { }    

    async loadAsync(url: string) : Promise<SoNetAppsConfig> {        
        return new Promise<SoNetAppsConfig>((resolve) => {
            this.http.get(url).map(res => res.json()).subscribe(config => {
                this._config = config;
                resolve();
            })
        });
    }

    getConfiguration(): SoNetAppsConfig {
        return this._config;
    }
}