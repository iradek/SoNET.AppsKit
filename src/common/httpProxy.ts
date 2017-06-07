import { Injectable } from "@angular/core";
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from "@angular/http";
import { URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { OAuthService } from "./oAuthService";
import { UrlService } from "./urlService";


@Injectable()
export class HttpProxy extends Http {

    private oAuthService: OAuthService;
    private urlService: UrlService;

    constructor(backend: XHRBackend, options: RequestOptions, oauthService: OAuthService, urlService: UrlService) {
        super(backend, options);
        this.oAuthService = oauthService;
        this.urlService = urlService;
    }

    async getAsync<T>(url: string, options?: RequestOptionsArgs): Promise<T> {
        const response = await this.get(url, options).toPromise();
        return response ? response.json() : Promise.reject("No response");
    }

    async postAsync<T>(url: string, body: any, options?: RequestOptionsArgs): Promise<T> {
        const response = await this.post(url, body, options).toPromise();
        return response.json();
    }

    async patchAsync<T>(url: string, body: any, options?: RequestOptionsArgs): Promise<T> {
        const response = await this.patch(url, body, options).toPromise();
        return response.json();
    }

    async putAsync<T>(url: string, body: any, options?: RequestOptionsArgs): Promise<T> {
        const response = await this.put(url, body, options).toPromise();
        return response.json();
    }

    async deleteAsync<T>(url: string, options?: RequestOptionsArgs): Promise<T> {
        const response = await this.delete(url, options).toPromise();
        return response.json();
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

    // post(url: string, body: any) {
    //     this.showSpinner();
    //     //wrap in Observable to do not call http.post.subscribe() multiple times when injecting hideSpinner() to avoid multiple request
    //     return Observable.create((observer: Observer<Response>) => {
    //         super.post(this.resolveFinalUrl(url), body)
    //             //.timeout(this.timeout, new Error(`Operation timed out after ${this.timeout} ms. Please try to work with smaller data set`))
    //             .subscribe(httpPostResults => {
    //                 observer.next(httpPostResults);
    //                 observer.complete();
    //             },
    //             null,
    //             () => this.hideSpinner());
    //     });
    // }  

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

    showSpinner() {

    }

    hideSpinner() {

    }
}