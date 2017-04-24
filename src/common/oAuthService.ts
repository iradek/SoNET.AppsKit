import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { RequestOptions, Request, RequestOptionsArgs, Response, Headers, Http } from "@angular/http";
import { AppsConfig } from './apps.config'
import { OAuthConfig } from './oAuth.config';
import * as enums from './enums';
import { UrlService } from "./urlService";

@Injectable()
export class OAuthService {

    token: string;
    tokenUrl: string;
    tokenKey: string = "access_token";

    constructor(private http: Http, private urlService: UrlService, private oAuthConfig: OAuthConfig, private appsConfig: AppsConfig) {
        this.tokenUrl = this.urlService.resolveFinalUrl("/mvc/oauth/token");
    }

    updateToken(): Observable<boolean> {
        //return of(true);
        return this.retrieveAccessToken().map((response: string) => {
            if (response && response.length) {
                this.token = response;
                return true;
            }
            return false;
        });     
    }

    retrieveAccessToken(): Observable<string> {
        if (this.oAuthConfig.oAuthGrant == enums.OAuthGrant.ResourceOwner) {
            var formUrlEncodedContent = new URLSearchParams();
            formUrlEncodedContent.append("scope", "Api.Access" + (this.oAuthConfig.siteName ? " SiteName:" + this.oAuthConfig.siteName : "") /*required to call any SoNET API method*/ + (this.oAuthConfig.passwordAlreadyEncrypted ? " Password.Encrypted" : ""));
            formUrlEncodedContent.append("grant_type", "password");
            formUrlEncodedContent.append("username", this.oAuthConfig.userName);
            formUrlEncodedContent.append("password", this.oAuthConfig.userPassword);
            return this.requestAccessToken(formUrlEncodedContent);
        }
        if (this.oAuthConfig.oAuthGrant == enums.OAuthGrant.ClientCredentials) {
            var formUrlEncodedContent = new URLSearchParams();
            formUrlEncodedContent.append("scope", "Api.Access" + (this.oAuthConfig.siteName ? " SiteName:" + this.oAuthConfig.siteName : "")); //required to call any SoNET API method )
            formUrlEncodedContent.append("grant_type", "client_credentials")
            return this.requestAccessToken(formUrlEncodedContent);
        }
        // If neither auth type enum matched.
        throw new Error(`{nameof(enums.OAuthGrant)} is not supported.`);
    }

    /** 
     * Requests oAuth access token.
     * @param formContent (key, value) pairs with application/x-www-form-urlencoded data to send along.
     */
    requestAccessToken(formContent: URLSearchParams): Observable<string> {
        let clientID = this.appsConfig.oauth_client_id;
        let clientSecret = this.appsConfig.oauth_client_secret;
        var newHeaders = new Headers();
        newHeaders.set("Content-Type", "application/x-www-form-urlencoded");
        newHeaders.set("Authorization", "Basic " + this.base64EncodeForBasicAuthentication(clientID, clientSecret));
        let body = formContent.toString();
        return this.http.post(this.tokenUrl, body, { headers: newHeaders })
            .map(response => response.json())
            .map(result => result.access_token);
    }

    private base64EncodeForBasicAuthentication(userName: string, password: string): string {
        return btoa(`${userName}:${password}`);
    }


}