import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpProxy } from "./common/httpProxy";
import { OAuthService } from "./common/oAuthService";
import { UrlService } from "./common/urlService";
import { OAuthConfig } from "./common/oAuth.config";
import { ValidationService } from "./common/validationService";
import { ValidationMessage } from "./common/validationMessage.component";

export * from "./common/httpProxy";
export * from "./common/oAuthService";
export * from "./common/urlService";
export * from "./common/oAuth.config";
export * from "./common/validationService";
export * from "./common/validationMessage.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [    
  ],
  exports: [    
  ]
})
export class SoNETAppsKitModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SoNETAppsKitModule,
      providers: [HttpProxy, OAuthService, UrlService, OAuthConfig, ValidationService, ValidationMessage]
    };
  }
}
