import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClient } from "./common/apiClient";
import { HttpProxy } from "./common/httpProxy";
import { OAuthService } from "./common/oAuthService";
import { UrlService } from "./common/urlService";
import { AppsConfig } from "./common/apps.config";
import { ValidationService } from "./common/validationService";
import { ValidationMessage } from "./common/validationMessage.component";
import { IntegrationService } from "./common/intergrationService";

export * from "./common/apps.config";
export * from "./common/apiClient";
export * from "./common/httpProxy";
export * from "./common/oAuthService";
export * from "./common/urlService";
export * from "./common/validationService";
export * from "./common/validationMessage.component";
export * from "./common/intergrationService";
export * from "./common/enums";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidationMessage
  ],
  exports: [
    ValidationMessage
  ]
})
export class SoNETAppsKitModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SoNETAppsKitModule,
      providers: [ApiClient, HttpProxy, OAuthService, UrlService, ValidationService, IntegrationService]
    };
  }
}
