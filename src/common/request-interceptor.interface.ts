import {Headers} from '@angular/http'

export interface IRequestInterceptor {
  beforeRequestAsync(url: string, method: string, data: any, headers: Headers): Promise<boolean>;
}