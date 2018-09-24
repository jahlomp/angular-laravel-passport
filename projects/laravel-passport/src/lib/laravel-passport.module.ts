import { NgModule, ModuleWithProviders } from '@angular/core';
import { LaravelPassportComponent } from './laravel-passport.component';
import { LaravelPassportService } from './laravel-passport.service';
import { LaravelPassportConfig } from './laravel-passport-config';
import { LaravelPassportConfigService } from './laravel-passport-config.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [LaravelPassportComponent],
  exports: [LaravelPassportComponent]
})
export class LaravelPassportModule {
  static forRoot(config: LaravelPassportConfig): ModuleWithProviders {
    return {
      ngModule: LaravelPassportModule,
      providers: [
        LaravelPassportService,
        {
          provide: LaravelPassportConfigService,
          useValue: config
        }
      ]
    };
  }
}
