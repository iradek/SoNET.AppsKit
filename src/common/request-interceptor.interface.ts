export interface IRequestInterceptor {
  beforeRequestAsync(url: string, method: string, data: any, headers: Headers): Promise<boolean>;
}