import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoNetApiClient } from "./common/sonet.apiClient.service";
import { SoNetProxy } from "./common/sonet.proxy.service";
import { SoNetOAuthService } from "./common/sonet.oAuth.service";
import { SoNetUrlService } from "./common/sonet.url.service";
import { SoNetAppsConfig } from "./common/sonet.apps.config";
import { SoNetConfigService } from './common/sonet.config.service';
import { SoNetValidationService } from "./common/sonet.validation.service";
import { SoNetIntegrationService } from "./common/sonet.intergration.service";
import { ValidationMessageComponent } from "./components/sonet-validation-message.component";
import { BusyIndicatorComponent } from "./components/sonet-busy-indicator.component";

export * from "./common/sonet.apps.config";
export * from "./common/sonet.apiClient.service";
export * from "./common/sonet.proxy.service";
export * from "./common/sonet.oAuth.service";
export * from "./common/sonet.url.service";
export * from "./common/sonet.validation.service";
export * from "./components/sonet-validation-message.component";
export * from "./components/sonet-busy-indicator.component";
export * from "./common/sonet.intergration.service";
export * from "./common/sonet.enums";
export * from "./common/sonet.config.service";

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
      providers: [SoNetApiClient, SoNetProxy, SoNetOAuthService, SoNetUrlService, SoNetValidationService, SoNetIntegrationService, SoNetConfigService]
    };
  }
}