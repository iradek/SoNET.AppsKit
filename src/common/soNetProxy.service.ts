import { Injectable } from "@angular/core";
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from "@angular/http";
import { URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { IRequestInterceptor } from "./request-interceptor.interface";
import { IResponseInterceptor } from "./response-interceptor.interface";
import { UrlService } from "./url.service";
import { OAuthService } from "./oAuth.service";
import { AppsConfig } from "./apps.config";

export interface Func<T, T1, T2, TResult> {
    (item: T, item1: T1, item2: T2): TResult;
}

@Injectable()
export class SoNetProxy extends Http {

    private oAuthService: OAuthService;
    private urlService: UrlService;
    private appsConfig: AppsConfig;
    private requestInterceptors: IRequestInterceptor[] = [];
    private responseInterceptors: IResponseInterceptor[] = [];

    constructor(backend: XHRBackend, options: RequestOptions, oauthService: OAuthService, urlService: UrlService, appsConfig: AppsConfig) {
        super(backend, options);
        this.oAuthService = oauthService;
        this.urlService = urlService;
        this.appsConfig = appsConfig;
    }

    async getAsync<T>(url: string, options: RequestOptions = new RequestOptions()): Promise<T> {
        return await this._requestCoreAsync(url, "GET", null, options, (url, data, modOptions) => {
            return this.get(url, modOptions);
        });
    }

    public async postAsync<T>(url: string, data?: any, options: RequestOptions = new RequestOptions()): Promise<T> {
        return await this._requestCoreAsync(url, "POST", data, options, (url, data, modOptions) => {
            return this.post(url, data, modOptions);
        });
    }

    async patchAsync<T>(url: string, data?: any, options: RequestOptions = new RequestOptions()): Promise<T> {
        return await this._requestCoreAsync(url, "PATCH", data, options, (url, data, modOptions) => {
            return this.patch(url, data, modOptions);
        });
    }

    async putAsync<T>(url: string, data?: any, options: RequestOptions = new RequestOptions()): Promise<T> {
        return await this._requestCoreAsync(url, "PUT", data, options, (url, data, modOptions) => {
            return this.put(url, data, modOptions);
        });
    }

    public async deleteAsync<T>(url: string, options: RequestOptions = new RequestOptions()): Promise<T> {
        return await this._requestCoreAsync(url, "DELETE", null, options, (url, data, modOptions) => {
            return this.delete(url, modOptions);
        });
    }

    public async headAsync<T>(url: string, options: RequestOptions = new RequestOptions()): Promise<T> {
        return await this._requestCoreAsync(url, "HEAD", null, options, (url, data, modOptions) => {
            return this.head(url, modOptions);
        });
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(this.urlService.resolveFinalUrl(url), options);
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(this.urlService.resolveFinalUrl(url), body, options);
    }

    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.patch(this.urlService.resolveFinalUrl(url), body, options);
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(this.urlService.resolveFinalUrl(url), body, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(this.urlService.resolveFinalUrl(url), options);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.head(this.urlService.resolveFinalUrl(url), options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        //adding access token to each http request before calling super(..,..)
        let token = this.oAuthService.token;
        if (typeof url === 'string') {
            if (!options)
                options = { headers: new Headers() };
            options.headers.set("Authorization", `Bearer ${token}`);
        }
        else {
            url.headers.set("Authorization", `Bearer ${token}`);
        }
        return super.request(url, options).catch((error) => {
            //if got authorization error - try to update access token
            if (error.status === 401) {
                return this.oAuthService.updateToken().mergeMap((result: boolean) => {
                    //if got new access token - retry request
                    if (result)
                        return this.request(url, options);
                    //otherwise - throw error
                    return Observable.throw(new Error('Can\'t refresh the token'));
                })
            }
            else
                Observable.throw(error);
        })
    }

    public registerRequestInterceptor(requestInterceptor: IRequestInterceptor): void {
        this.requestInterceptors.push(requestInterceptor);
    }

    public deregisterRequestInterceptor(requestInterceptor: IRequestInterceptor): boolean {
        let indexOfItem = this.requestInterceptors.indexOf(requestInterceptor);
        if (indexOfItem === -1)
            return false;
        this.requestInterceptors.splice(indexOfItem, 1);
        return true;
    }

    public registerResponseInterceptor(responseInterceptor: IResponseInterceptor): void {
        this.responseInterceptors.push(responseInterceptor);
    }

    public deregisterResponseInterceptor(responseInterceptor: IResponseInterceptor): boolean {
        let indexOfItem = this.responseInterceptors.indexOf(responseInterceptor);
        if (indexOfItem === -1)
            return false;
        this.responseInterceptors.splice(indexOfItem, 1);
        return true;
    }

    private async _requestCoreAsync(url: string, method: string, data: any, options: RequestOptions, action: Func<string, any, RequestOptions, Observable<Response>>): Promise<any> {
        options.headers = options.headers || new Headers();
        if (this.appsConfig!.logging)
            console.log(`Request. Url:'${url}'. Method:'${method}'`, data, options);

        let shouldIntercept = await this._invokeRequestInterceptorsAsync(url, method, data, options.headers);
        if (shouldIntercept)
            return;

        let response;
        try {
            response = await action(url, data, options).toPromise();
            if (this.appsConfig!.logging)
                console.log(`Response. Url:'${url}'. Method:'${method}'`, response);
        }
        catch (errorResponse) {
            response = errorResponse;
        }

        shouldIntercept = await this._invokeResponseInterceptorsAsync(response, url, method, data, options.headers);
        if (shouldIntercept)
            return;

        if (!response.ok)
            throw new Error(`Failed to call api ${method} ${url}`);
        try {
            return response.json();
        }
        catch (e) {
            return response.text();
        }
    }

    private async _invokeRequestInterceptorsAsync(url: string, method: string, data: any, headers: Headers): Promise<boolean> {
        for (const requestInterceptor of this.requestInterceptors) {
            const shouldIntercept = await requestInterceptor.beforeRequestAsync(url, method, data, headers);
            if (shouldIntercept)
                return true;
        }
        return false;
    }

    private async _invokeResponseInterceptorsAsync(response: Response, url: string, method: string, data: any, headers: Headers): Promise<boolean> {
        for (const responseInterceptor of this.responseInterceptors) {
            const shouldIntercept = await responseInterceptor.afterResponseAsync(response, url, method, data, headers);
            if (shouldIntercept)
                return true;
        }
        return false;
    }
}