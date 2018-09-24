import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LaravelPassportModule, LaravelPassportConfig } from 'projects/laravel-passport/src/public_api';

const laravelPassportConfig: LaravelPassportConfig = {
  clientId: 6,
  clientSecret: 'mIscxCT5jPwPSCIM3g7DZsUPLyxmc2FUSSdoNaDT',
  apiRoot: 'http://bitgrid.test'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LaravelPassportModule.forRoot(laravelPassportConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
