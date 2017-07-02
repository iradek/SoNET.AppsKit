import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClient } from "./common/apiClient.service";
import { SoNetProxy } from "./common/soNetProxy.service";
import { OAuthService } from "./common/oAuth.service";
import { UrlService } from "./common/url.service";
import { AppsConfig } from "./common/apps.config";
import { ValidationService } from "./common/validation.service";
import { IntegrationService } from "./common/intergration.service";
import { ValidationMessageComponent } from "./components/validation-message.component";
import { BusyIndicatorComponent } from "./components/busy-indicator.component";

export * from "./common/apps.config";
export * from "./common/apiClient.service";
export * from "./common/soNetProxy.service";
export * from "./common/oAuth.service";
export * from "./common/url.service";
export * from "./common/validation.service";
export * from "./components/validation-message.component";
export * from "./components/busy-indicator.component";
export * from "./common/intergration.service";
export * from "./common/enums";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValidationMessageComponent, BusyIndicatorComponent
  ],
  exports: [
    ValidationMessageComponent, BusyIndicatorComponent
  ]
})
export class SoNETAppsKitModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SoNETAppsKitModule,
      providers: [ApiClient, SoNetProxy, OAuthService, UrlService, ValidationService, IntegrationService]
    };
  }
}
