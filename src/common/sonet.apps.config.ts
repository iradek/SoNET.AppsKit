import { Injectable } from "@angular/core";
import { OAuthGrant } from "./sonet.enums";
import { SoNetConfigService } from "./sonet.config.service";
import { SoNetIntegrationService } from "./sonet.intergration.service";
import { concat } from "rxjs/operator/concat";

/**
 * Holds all configration values.
 */
@Injectable()
export class SoNetAppsConfig {

    private _configFromFile: SoNetAppsConfig;

    constructor(configService: SoNetConfigService) {
        //allow to override the "compiled" values from "file" values
        this._configFromFile = configService.getConfiguration();        
    }

    private _api_baseUrl: string;
    /** Base url of installed SoNET engine against which you are issuing API calls.  */
    get api_baseUrl(): string {
        return (this._configFromFile && this._configFromFile.api_baseUrl) || this._api_baseUrl;
    }
    set api_baseUrl(value: string) {
        this._api_baseUrl = value;
    }

    private _oauth_client_id: string;
    /** Your Client ID obtained by registering via http://store.iradek.com/Client/Register */
    get oauth_client_id(): string {
        return (this._configFromFile && this._configFromFile.oauth_client_id) || this._oauth_client_id;
    }
    set oauth_client_id(value: string) {
        this._oauth_client_id = value;
    }

    private _oauth_client_secret: string;
    /** Your Client Secret obtained by registering via http://store.iradek.com/Client/Register */
    get oauth_client_secret(): string {
        return (this._configFromFile && this._configFromFile.oauth_client_secret) || this._oauth_client_secret;
    }
    set oauth_client_secret(value: string) {
        this._oauth_client_secret = value;
    }

    private _oAuthGrant: OAuthGrant = OAuthGrant.ClientCredentials;
    /** Supported OAuth grant type. Change it before API call to adjust oauth grant. With ClientCredentials grant you can call APIs that do not require Site user. With ResourceGrant credentials you call APIs that act on behalf of Site user. See http://[base url of SoNET]/api/help for more details.  */
    get oAuthGrant(): OAuthGrant {
        return (this._configFromFile && this._configFromFile.oAuthGrant) || this._oAuthGrant;
    }
    set oAuthGrant(value: OAuthGrant) {
        this._oAuthGrant = value;
    }

    private _siteName: string;
    /** Name of the Site when Site-level access is being requested. */
    get siteName(): string {
        return (this._configFromFile && this._configFromFile.siteName) || this._siteName;
    }
    set siteName(value: string) {
        this._siteName = value;
    }

    private _userName: string;
    /** Name of the user when ResourceOwner grant is used. */
    get userName(): string {
        return (this._configFromFile && this._configFromFile.userName) || this._userName;
    }
    set userName(value: string) {
        this._userName = value;
    }

    private _userPassword: string;
    /** User password when ResourceOwner grant is used. */
    get userPassword(): string {
        return (this._configFromFile && this._configFromFile.userPassword) || this._userPassword;
    }
    set userPassword(value: string) {
        this._userPassword = value;
    }

    private _passwordAlreadyEncrypted: boolean;
    /** Whether the user password is already encrypted (ResourceOwner grant). */
    get passwordAlreadyEncrypted(): boolean {
        return (this._configFromFile && this._configFromFile.passwordAlreadyEncrypted) || this._passwordAlreadyEncrypted;
    }
    set passwordAlreadyEncrypted(value: boolean) {
        this._passwordAlreadyEncrypted = value;
    }

    private _logging: boolean;
    /** Whether to enable extra logging to a console that might help diagnose api calls made by this library */
    get logging(): boolean {
        return (this._configFromFile && this._configFromFile.logging) || this._logging;
    }
    set logging(value: boolean) {
        this._logging = value;
    }
}