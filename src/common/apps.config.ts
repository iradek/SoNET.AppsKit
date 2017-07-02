import { Injectable } from "@angular/core";
import { OAuthGrant } from "./enums";

/**
 * Holds all configration values. Please implement (not extend) to set all values.
 */
@Injectable()
export class AppsConfig {
    
    /** Base url of installed SoNET engine against which you are issuing API calls.  */
    api_baseUrl: string;

    /** Your Client ID obtained by registering via http://store.iradek.com/Client/Register */
    oauth_client_id: string;    

    /** Your Client ID obtained by registering via http://store.iradek.com/Client/Register */
    oauth_client_secret: string;
    
    /** Supported OAuth grant type. Change it before API call to adjust oauth grant. With ClientCredentials grant you can call APIs that do not require Site user. With ResourceGrant credentials you call APIs that act on behalf of Site user. See http://[base url of SoNET]/api/help for more details.  */
    oAuthGrant: OAuthGrant = OAuthGrant.ClientCredentials;

    /** Name of the Site when Site-level access is being requested. */
    siteName: string;

    /** Name of the user when ResourceOwner grant is used. */
    userName: string;

    /** User password when ResourceOwner grant is used. */
    userPassword: string;

    /** Whether the user password is already encrypted (ResourceOwner grant). */
    passwordAlreadyEncrypted: boolean

    /** Whether to enable extra logging to a console that might help diagnose api calls made by this library */
    logging: boolean
}