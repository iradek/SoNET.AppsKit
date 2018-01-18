# sonet-appskit

## Description

This is a set of common services and components that help to create SoNET Web Engine enabled apps. This allows you to get started with this kit and hopefully create something wonderful and useful to many people. Not only can you generate feature packed websites instantly, you can make your own solutions that use the various functions available via the engine API as you see fit.

## Compilation

```bash
$ npm install
$ npm run build
```

## Installation

```bash
$ npm install sonet-appskit --save
```

## Using the library from typescript

*app.module.ts*
```typescript
// Import your library
import { SoNETAppsKitModule } from 'sonet-appskit';

@NgModule({
  (...)
  imports: [
    (...)
    // Specify your library as an import
    SoNETAppsKitModule
  ],
  providers: [
        SliderApiClient,
        SoNetOAuthService,
        SoNetUrlService,
        SoNetConfigService,        
        SoNetProxy,             
        (...)
    ],
    (...)
})
export class AppModule { }
```

## Configuration

There are two different ways configuration can be provided.

### 1. AppsConfig Class Way

This way all configuration values are compiled into a code and they can be dynamically calculated by the code.

*app.module.ts*
```typescript
@NgModule({
  (...)
  providers: [ 
        //register custom SoNetAppsConfig which provides the settings from the code when you need to drive them dynamically
        {
            provide: SoNetAppsConfig,
            deps: [SoNetConfigService],
            useFactory: appsConfigFactory
        },       
        (...)
    ],
    (...)
})
(...)
export function appsConfigFactory(configService: SoNetConfigService) {
    return new Config(configService);
}
```

*apps.config.ts*
```typescript
@Injectable()
/**
 * Configure this SoNET Apps Kit here.
 */
export class Config extends SoNetAppsConfig {
    /** Base url of installed SoNET engine against which you are issuing API calls. There are many SoNET engines already deployed throughout the world. An example would be: https://www.lpk7.com. You can always quickly install your own either on premise or in the cloud. Please refer to this link: http://www.iradek.com/Products/ */
    api_baseUrl = "";
    /** Your Client ID obtained by registering via http://store.iradek.com/Client/Register */
    oauth_client_id =  "";
    /** Your Client Secret obtained by registering via http://store.iradek.com/Client/Register */
    oauth_client_secret = "";
    /** Name of the Site when Site-level access is being requested. */
    siteName = "";
    /** Name of the user when ResourceOwner grant is used. */
    userName = "";
    /** User password when ResourceOwner grant is used. */
    userPassword = "";
    /** Whether the user password is already encrypted (ResourceOwner grant). */
    passwordAlreadyEncrypted = false;
    /** Supported OAuth grant type. Change it before API call to adjust oauth grant. With ClientCredentials grant you can call APIs that do not require Site user. With ResourceGrant credentials you call APIs that act on behalf of Site user. See http://[base url of SoNET]/api/help for more details.  */
    oAuthGrant = OAuthGrant.ClientCredentials;
    /** Whether to enable extra logging to a console that might help diagnose api calls made by this library */
    logging = false;
}
```

### 2. External JSON File Way

This way all configuration values compiled into a code as in a [previous example](###-1.-AppsConfig-Class-Way) can be overriden by a static, external json file. This can be advantageous when file needs to 'survive' software updates.

*app.module.ts*
```typescript
@NgModule({
  (...)
  providers: [ 
        //register configLoader to load the settings from a file; those override code-based SoNetAppsConfig settings when needed
        {
            provide: APP_INITIALIZER,
            useFactory: configLoader,
            deps: [SoNetConfigService],
            multi: true
        },
        (...)
    ],
    (...)
})
(...)
//point the loader to a file with configuration settings
const configFilePath = 'assets/apps.config.json';
export function configLoader(configService: SoNetConfigService) {
    //Note: this factory needs to return a function that returns a promise
    return () => configService.loadAsync(configFilePath);
}
```

*apps.config.ts*
```json
{
    "api_baseUrl": "",
    "oauth_client_id": "",
    "oauth_client_secret": "",
    "siteName" : "",
    "userName" : "",
    "userPassword" : "",
    "passwordAlreadyEncrypted" : false,
    "oAuthGrant" : "ClientCredentials",                
    "logging": false
}
```

## SoNET Engine

For more information about SoNET engine please visit: http://www.iradek.com

## License

MIT © [i-Radek Software](mailto:iradek@iradek.com)
