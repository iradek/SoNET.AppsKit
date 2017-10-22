import {Headers} from '@angular/http'

export interface IResponseInterceptor {
  afterResponseAsync(response: any, url: string, method: string, data: any, headers: Headers): Promise<boolean>;
}